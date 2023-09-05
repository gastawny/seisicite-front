import './styles.css'

export function Card({ title, id, autor, area }) {
  return (
    <div className="box">
      <span></span>
      <div className="content">
        <h2>{id}</h2>
        <h3>{`${title}  asd asd asd asd dsad asd asd asdsad asd asd`}</h3>
        <h4>{autor}</h4>
        <h5>{area}</h5>
        <a href="#">Read More</a>
      </div>
    </div>
  )
}