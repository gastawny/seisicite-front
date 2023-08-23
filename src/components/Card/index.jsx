import './styles.css'

export function Card({ title, id, autor, area }) {
  return (
    <div className="container">
      <div className="box">
        <span></span>
        <div className="content">
          <h2>{id}</h2>
          <h3>{title}</h3>
          <h4>{area}</h4>
          <h5>{autor}</h5>
          <a href="#">Read More</a>
        </div>
      </div>
    </div>
  )
}