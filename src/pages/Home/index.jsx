import { useCallback, useEffect, useState } from 'react'
import Form from 'components/Form'
// import { useNavigate } from 'react-router-dom'
// import { useCookies } from 'hooks/useCookies'

const initialValues = {
  username: '',
  password: '',
}

export function Home() {
  const [datas, setDatas] = useState(initialValues)
  // const { getCookies, setCookies } = useCookies()
  // const navigate = useNavigate()

  useEffect(() => {
    // const token = getCookies('auth')
    // if (token) navigate('/dashboard')
  }, [])

  const handleInputChange = useCallback((type, event) => {
    setDatas((datas) => {
      return { ...datas, [type]: event.target.value }
    })
  }, [])

  function onSubmit(event) {
    event.preventDefault()

    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(datas),
    // }

    // const response = fetch('/api/login', requestOptions)
    // const data = response.json()

    // setCookies('auth', data.token)
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
        </Form.Root>
      </div>
    </>
  )
}
