import { RadioButtons } from 'components/RadioButtons'
import { Timer } from 'components/Timer'
import { useEffect, useState } from 'react'
import { sessionHOC } from 'services/auth/sessionHOC'
import questions from 'utils/questions'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { axiosServer } from 'config/axios/axios'
import { useCookies } from 'hooks/useCookies'
import { Modal } from 'components/Modal'

function Questions() {
  const { id } = useParams()
  const { getCookies } = useCookies()
  const location = useLocation()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [modal, setModal] = useState(false)
  const [selected, setSelected] = useState(
    questions.map((question, index) => ({
      [index]: question.options[0]
    }))
  )

  const queryParams = new URLSearchParams(location.search)

  useEffect(() => {
    try {
      const edit = queryParams.get('edit')

      if (edit == 'true') {
        (async () => {
          const { data, status } = await axiosServer(`grade/${id}/${getCookies('user')?.userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${getCookies('accessToken')}`
            }
          })
          if (status !== 200) return

          const { crit1, crit2, crit3, crit4, crit5 } = data

          setSelected([
            { 0: `${parseInt(crit1)}` },
            { 1: `${parseInt(crit2)}` },
            { 2: `${parseInt(crit3)}` },
            { 3: `${parseInt(crit4)}` },
            { 4: `${parseInt(crit5)}` }
          ])
        })()
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    console.log(selected[0][`${0}`])
    console.log(selected[1][`${1}`])
    console.log(selected[2][`${2}`])
    console.log(selected)
  }, [selected])

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
      const edit = queryParams.get('edit') == 'true'

      const { status } = await axiosServer('/grade', {
        method: edit ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${getCookies('accessToken')}`,
        },
        data: {
          id: {
            workId: id,
            userId: getCookies('user')?.userId
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
            preSelected={selected[index][`${index}`]}
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
