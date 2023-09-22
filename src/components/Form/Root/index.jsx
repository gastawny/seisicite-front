import styles from './styles.module.css'

export function Root({ children, onSubmit }) {
  return (
    <div className={styles['box']}>
      <form action={onSubmit}>
        <h2>Área do Avaliador</h2>
        {children}
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}
