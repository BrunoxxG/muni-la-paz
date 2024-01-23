import { Link } from "react-router-dom";

import style from "./Card.module.css";

export default function Card({ publication }) {
  return (
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
  );
}
