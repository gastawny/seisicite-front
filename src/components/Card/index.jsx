import { Link } from 'react-router-dom'
import './styles.css'

export function Card({ title, id, author, theme }) {
  return (
    <div className="box">
      <span></span>
      <div className="content">
        <h2>{id}</h2>
        <h3>{title}</h3>
        <h4>{author}</h4>
        <h5>{theme}</h5>
        <Link to={`/questions/${id}?edit=true&title=${title}&author=${author}&theme=${theme}`}>
          Editar
        </Link>
        <Link to={`/questions/${id}?title=${title}&author=${author}&theme=${theme}`}>Avaliar</Link>
      </div>
    </div>
  )
}
