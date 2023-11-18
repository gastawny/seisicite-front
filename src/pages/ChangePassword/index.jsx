import { Background } from 'components/Background'
import Form from 'components/Form'
import { Loading } from 'components/Loading'
import { axiosServer } from 'config/axios/axios'
import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const initialValues = {
  username: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export function ChangePassword() {
  const [datas, setDatas] = useState(initialValues)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
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
          username: datas.username,
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
      setError('Senha antiga ou usuário inválidoa')
    }

    setLoading(false)
    setDatas(initialValues)
  }

  return (
    <Background colors={['var(--primary)', 'var(--secondary)']} frequency={500}>
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
        <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[40rem] md:w-[82vw] md:h-[32rem] xl:w-[60vw] 2xl:w-[50vw] 2xl:h-[34rem]">
          <Form.Root onSubmit={onSubmit} submitButtonText="Alterar senha">
            <Form.Input value={datas.username} onChange={(e) => handleInputChange('username', e)}>
              Usuário
            </Form.Input>
            <Form.Input
              value={datas.oldPassword}
              type="password"
              onChange={(e) => handleInputChange('oldPassword', e)}
            >
              Senha recebida por e-mail
            </Form.Input>
            <div className="flex gap-4 flex-col md:flex-row">
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
            </div>
            <Link
              to="/"
              className="text-primary text-base text-right mt-4 font-medium duration-300 hover:text-white"
            >
              Fazer login
            </Link>
            {error && <span className="text-red-500 font-bold mt-2">{error}</span>}
          </Form.Root>
        </div>
      )}
    </Background>
  )
}
