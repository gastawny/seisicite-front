import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Slider } from 'components/Slider'

export function RadioButtons({ title, setSelected, preSelected }) {
  const [option, setOption] = useState(preSelected)

  useEffect(() => {
    setOption(preSelected)
  }, [preSelected])

  useEffect(() => {
    setSelected(parseInt(option / 10))
  }, [option])

  return (
    <div className={styles['wrapper']}>
      <div className={styles['title']}>{title}</div>
      <div className={styles['box']}>
        <Slider
          min={60}
          max={100}
          tooltip={parseInt(option / 10)}
          value={option}
          onInput={(e) => setOption(e.target.value)}
        />
      </div>
    </div>
  )
}
