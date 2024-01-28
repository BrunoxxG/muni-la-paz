import { Link } from "react-router-dom";

import style from "./Publication.module.css";

export default function Publication({ publication, complexes }) {
  console.log('COMPLEXES',complexes)
  return (
    publication ? 
    <div className={style.card}>
      <img src={publication.image} alt={publication.title} />
      <div className={style.cardText}>
        <small>{publication.date}</small>
        <Link to={`/detail/${publication.id}`} className={style.link}>
          <h3>{publication.title}</h3>
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
    :
    <div className={style.card}>
      <img src={complexes.image} alt={complexes.name} />
      <div className={style.cardText}>
        <Link to={`/detail/${complexes.id}`} className={style.link}>
          <h3>{complexes.name}</h3>
        </Link>
        <p>{complexes.address}</p>
        <p>{complexes.description}</p>
      </div>
      <div className={style.cardFooter}>
        {/* <span>{complexes.type}</span> */}
        <Link to={`/alojamientos/#${complexes.id}`} className={style.link}>
          <label>LEER MÁS</label>
        </Link>
      </div>
    </div>
  );
}
