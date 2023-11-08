import styles from './styles.module.css'

export function Modal({ children, displayModal, closeModal }) {

  function funcCloseModal(e) {
    e.stopPropagation()
    closeModal()
  }

  const modal = (
    <div className={styles['modal']} onClick={funcCloseModal}>
      <div onClick={e => e.stopPropagation()} className={styles['modal-flex']}>{children}</div>
    </div>
  )

  return (displayModal ? modal : null)
}