import styles from './styles.module.css'

export function Slider() {
  return (
    <>
      <div className={styles['range-slider']}></div>
      <input type="range" min="0" max="100" value="50" className="slider" />
      <div className={styles['slider-thumb']}>
        <div className={styles['tooltip']}></div>
      </div>
      <div className={styles['progress']}></div>
    </>
  )
}
