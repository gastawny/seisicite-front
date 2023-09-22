import styles from './styles.module.css'

export function Radio({ id, text, name, onChange, checked, value }) {
  return (
    <label htmlFor={id} className={styles['radiobutton-label']}>
      <input
        className={styles['radiobutton-input']}
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className={styles['custom-radiobutton']} />
      {text}
    </label>
  )
}

