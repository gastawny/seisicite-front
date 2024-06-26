import { useCallback, useEffect, useState } from 'react'
import Form from 'components/Form'
import { axiosServer } from 'config/axios/axios'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'hooks/useCookies'
import { Loading } from 'components/Loading'
import { Background } from 'components/Background'

const initialValues = {
  username: '',
  password: '',
}

export function Home() {
  const [datas, setDatas] = useState(initialValues)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { getCookies, setCookies } = useCookies()
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = getCookies('accessToken')

    if (accessToken) navigate('/dashboard')
  }, [])

  const handleInputChange = useCallback((type, event) => {
    setDatas((datas) => {
      return { ...datas, [type]: event.target.value }
    })
  }, [])

  async function onSubmit(event) {
    event.preventDefault()
    try {
      setLoading(true)
      const res = await axiosServer('/auth/signin', {
        method: 'POST',
        data: {
          username: datas.username,
          password: datas.password,
        },
      })

      if (res.status !== 200) return

      setCookies('accessToken', res.data.accessToken, {
        expires: new Date(res.data.expiration),
      })
      setCookies('refreshToken', res.data.refreshToken, {
        expires: new Date(res.data.expiration),
      })
      setCookies(
        'user',
        {
          username: res.data.username,
          userId: res.data.userId,
        },
        {
          expires: new Date(res.data.expiration),
        }
      )

      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      setError('Usuário ou senha inválidos')
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
      <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[28rem] w-[95vw] md:w-[75vw] xl:w-[35vw] 2xl:w-[30vw]">
        <Form.Root onSubmit={onSubmit} submitButtonText="Login">
          <Form.Input value={datas.username} onChange={(e) => handleInputChange('username', e)}>
            Usuário
          </Form.Input>
          <Form.Input
            value={datas.password}
            type="password"
            onChange={(e) => handleInputChange('password', e)}
          >
            Senha
          </Form.Input>
          <Link
            to="/changePassword"
            className="text-primary text-base text-right mt-4 font-medium duration-300 hover:text-white"
          >
            Esqueceu sua senha?
          </Link>
          {error && <span className="text-red-500 font-bold mt-2">{error}</span>}
        </Form.Root>
      </div>
    </Background>
  )
}
