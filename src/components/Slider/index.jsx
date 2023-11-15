import styles from './styles.module.css'

export function Slider({ min, max, value, onInput, tooltip }) {
  return (
    <div className={styles['range-slider']}>
      <input
        className={styles['slider']}
        type="range"
        min={min}
        max={max}
        value={value}
        onInput={onInput}
      />
      <div
        style={{ left: `${(100 * (value - min)) / (max - min)}%` }}
        className={styles['slider-thumb']}
      >
        <div className={styles['tooltip']}>{tooltip}</div>
      </div>
      <div
        style={{
          width: `${(100 * (value - min)) / (max - min)}%`,
        }}
        className={styles['progress']}
      ></div>
    </div>
  )
}
