import { useState } from 'react'
import './styles.css'

const initialValues = {
  username: '',
  password: '',
}

export function Form() {
  const [datas, setDatas] = useState(initialValues)

  function handleInputChange(type, event) {
    setDatas((datas) => {
      return { ...datas, [type]: event.target.value }
    })
  }

  return (
    <div className='box'>
      <form action=''>
        <h2>Área do Avaliador</h2>
        <div className='inputBox'>
          <input value={datas.username} onChange={e => handleInputChange('username', e)} type='text' required />
          <span>Usuário</span>
          <i></i>
        </div>
        <div className='inputBox'>
          <input value={datas.password} onChange={e => handleInputChange('password', e)} type='password' required />
          <span>Senha</span>
          <i></i>
        </div>
        <input type='submit' value='Login' />
      </form>
    </div>
  )
}
