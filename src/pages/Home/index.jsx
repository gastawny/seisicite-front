import { useCallback, useState } from 'react'
import { Background } from 'components/Background'
import Form from 'components/Form'

const initialValues = {
  username: '',
  password: '',
}

export function Home() {
  const [datas, setDatas] = useState(initialValues)

  const handleInputChange = useCallback((type, event) => {
    setDatas((datas) => {
      return { ...datas, [type]: event.target.value }
    })
  }, [])

  return (
    <>
      <Background />
      <img className='absolute z-20 left-1/2 -translate-x-1/2 top-16 sm:top-8 w-4/5 sm:w-1/4 2xl:1/3' src="/assets/images/logo.png" />
      <div className='absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Form.Root>
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
