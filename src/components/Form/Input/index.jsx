import { memo } from 'react'
import styles from './styles.module.css'

function Input({ children, value, onChange, type = 'text' }) {
  return (
    <div className={styles['inputBox']}>
      <input value={value} onChange={onChange} type={type} required />
      <span>{children}</span>
      <i></i>
    </div>
  )
}

function InputHOC(Component) {
  function Wrapper(props) {
    return <Component {...props} />
  }

  return memo(Wrapper, (prevProps, nextProps) => {
    return prevProps.value === nextProps.value
  })
}

const InputMemoized = InputHOC(Input)

export { InputMemoized as Input }
