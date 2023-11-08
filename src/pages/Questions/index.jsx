import { RadioButtons } from 'components/RadioButtons'
import { Timer } from 'components/Timer'
import { useState } from 'react'
import { sessionHOC } from 'services/auth/sessionHOC'
import questions from 'utils/questions'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosServer } from 'config/axios/axios'
import { useCookies } from 'hooks/useCookies'
import { Modal } from 'components/Modal'

function Questions() {
  const { id } = useParams()
  const { getCookies } = useCookies()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [modal, setModal] = useState(false)

  const [selected, setSelected] = useState(
    questions.map((question, index) => ({
      [index]: question.options[0]
    }))
  )

  function handleSetSelected(data, key) {
    const newSelected = selected.map((item) =>
      item[key]
        ? { ...item, [key]: data }
        : item
    )

    setSelected(newSelected)
  }

  async function handleSubmit() {
    try {

      const { status } = await axiosServer('/grade', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getCookies('accessToken')}`,
        },
        data: {
          id: {
            workId: id,
            userId: getCookies('user').userId
          },
          crit1: selected[0]['0'],
          crit2: selected[1]['1'],
          crit3: selected[2]['2'],
          crit4: selected[3]['3'],
          crit5: selected[4]['4'],
        }
      })

      if (status != 200) setMessage('Erro ao enviar avaliação')

      setMessage('Avaliação enviada com sucesso!')
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (err) {
      console.log(err)
      setMessage('Erro ao enviar avaliação')
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4 items-center mx-auto mt-32'>
        <Timer />
        <button onClick={() => setModal(true)} className='rounded-md px-4 text-3xl tracking-wide font-bold py-1 bg-primary w-full duration-300 hover:bg-[#0a2d5a] hover:text-white'>Enviar trabalho</button>
      </div>
      <div className='flex flex-wrap w-full gap-6 justify-center relative left-1/2 my-16 -translate-x-1/2'>
        {questions.map((question, index) => {
          return <RadioButtons
            key={index}
            setSelected={data => handleSetSelected(data, index)}
            title={question.title}
            options={question.options}
          />
        })}
      </div>
      <Modal closeModal={() => setModal(false)} displayModal={modal}>
        <div className='flex flex-col gap-4 rounded-md p-8 bg-bgColor text-xl'>
          <p className='text-white'>Tem certeza que deseja enviar?</p>
          <button onClick={handleSubmit} className='px-4 py-1 bg-primary text-zinc-950 font-semibold rounded-md duration-300 hover:bg-[#0a2d5a] hover:text-white' >Enviar</button>
          {message && <p className='text-primary font-bold tracking-wide'>{message}</p>}
        </div>
      </Modal>
    </>
  )
}

const QuestionsWrapper = sessionHOC(Questions)
export { QuestionsWrapper as Questions }
