import { useState } from 'react'
import { Option } from './Option'
import styles from './styles.module.css'
import { v4 } from 'uuid'

export function Radio({ options, title, setSelected }) {
  const [option, setOption] = useState(options[0])

  const handleChange = (event) => {
    setOption(event.target.value)
    setSelected(event.target.value)
  }

  const isChecked = (value) => option === value

  return (
    <div className={styles['wrapper']}>
      <div className={styles['title']}>{title}</div>
      <div className={styles['box']}>
        {options.map((option) => (
          <Option
            key={option}
            id={option + v4()}
            name={option + v4()}
            value={option}
            text={option}
            onChange={handleChange}
            checked={isChecked(option)}
          />
        ))}
      </div>
    </div>
  )
}
