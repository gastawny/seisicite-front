import Form from 'components/Form'
import { Loading } from 'components/Loading'
import { axiosServer } from 'config/axios/axios'
import { useCookies } from 'hooks/useCookies'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export function ChangePassword() {
  const [datas, setDatas] = useState(initialValues)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { getCookies } = useCookies()
  const navigate = useNavigate()

  const handleInputChange = useCallback((type, event) => {
    setDatas((datas) => {
      return { ...datas, [type]: event.target.value }
    })
  }, [])

  async function onSubmit(event) {
    event.preventDefault()
    if (datas.newPassword !== datas.confirmPassword) return setError('As senhas não coincidem')

    try {
      setLoading(true)
      const res = await axiosServer('/auth/changePassword', {
        method: 'PUT',
        data: {
          userId: getCookies('user').userId,
          oldPassword: datas.oldPassword,
          newPassword: datas.newPassword,
        },
      })

      if (res.status !== 200) return

      setMessage('Senha alterada com sucesso')
      setTimeout(() => {
        navigate('/dashboard')
      }, 2500)
    } catch (error) {
      console.log(error)
      setError('Senha antiga inválida')
    }

    setLoading(false)
    setDatas(initialValues)
  }

  return (
    <>
      {loading && (
        <Loading
          bgColor={'#000000aa'}
          colors={['var(--primary)', 'var(--secondary)', '#ffffff']}
          textColor={'#ffffff'}
          text={'Carregando...'}
        />
      )}
      {message && (
        <p className="absolute top-1/2 -translate-y-1/2 text-white text-3xl w-full text-center tracking-wider font-semibold">
          {message}
        </p>
      )}
      {!message && (
        <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[60vh] md:w-[75vw] md:h-[75vh] md:mt-8 xl:w-[40vw] xl:h-[75vh] xl:mt-6 2xl:w-[30vw] 2xl:h-[55vh]">
          <Form.Root onSubmit={onSubmit}>
            <Form.Input
              value={datas.oldPassword}
              type="password"
              onChange={(e) => handleInputChange('oldPassword', e)}
            >
              Senha antiga
            </Form.Input>
            <Form.Input
              value={datas.newPassword}
              type="password"
              onChange={(e) => handleInputChange('newPassword', e)}
            >
              Nova senha
            </Form.Input>
            <Form.Input
              value={datas.confirmPassword}
              type="password"
              onChange={(e) => handleInputChange('confirmPassword', e)}
            >
              Confirme a sua nova senha
            </Form.Input>
            {error && <span className="text-red-500 font-bold mt-2">{error}</span>}
          </Form.Root>
        </div>
      )}
    </>
  )
}
