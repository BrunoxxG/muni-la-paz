import { Link } from "react-router-dom";

export default function Publication({ publication }) {
  return (
    <div className="">
      <div className="">
        <small>{publication.date}</small>
        <Link to={`/complex/${publication.id}`} className="">
          <h3>{publication.name}</h3>
        </Link>
        <p>{publication.description}</p>
      </div>
      <div className={style.cardFooter}>
        <span>{publication.type}</span>
        <Link to={`/noticia/${publication.id}`} className={style.link}>
          <label>LEER MÁS</label>
        </Link>
      </div>
    </div>
  );
}