import { useCallback, useEffect, useState } from 'react'
import Form from 'components/Form'
import { axiosServer } from 'config/axios/axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'hooks/useCookies'

const initialValues = {
  username: '',
  password: '',
}

export function Home() {
  const [datas, setDatas] = useState(initialValues)
  const [error, setError] = useState('')
  const { getCookies, setCookies } = useCookies()
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = getCookies('accessToken')

    if (accessToken)
      navigate('/dashboard')
  }, [])

  const handleInputChange = useCallback((type, event) => {
    setDatas((datas) => {
      return { ...datas, [type]: event.target.value }
    })
  }, [])

  async function onSubmit(event) {
    event.preventDefault()
    try {
      const res = await axiosServer('/auth/signin', {
        method: 'POST',
        data: {
          username: datas.username,
          password: datas.password
        }
      })

      if (res.status !== 200) return

      setCookies('accessToken', res.data.accessToken)
      setCookies('refreshToken', res.data.refreshToken)
      setCookies('user', {
        username: res.data.username,
        userId: res.data.userId
      })

      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      setError('Usuário ou senha inválidos')
    }

    setDatas(initialValues)
  }

  return (
    <>
      <div className='absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Form.Root onSubmit={onSubmit}>
          <Form.Input value={datas.username} onChange={e => handleInputChange('username', e)}>
            Usuário
          </Form.Input>
          <Form.Input value={datas.password} onChange={e => handleInputChange('password', e)}>
            Senha
          </Form.Input>
          {error && <span className='text-primary mt-2'>{error}</span>}
        </Form.Root>
      </div>
    </>
  )
}
