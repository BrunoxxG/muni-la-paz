import { Link } from "react-router-dom";
import style from "./card.module.css";

const Card = (prop) => {
  return (
    <div className={style.card}>
      <div className={style.cardContainer}>
        <h2>Name: {prop.name}</h2>
        <img src={prop.image} alt={prop.name} />
        <h3>Weight: {prop.weight}</h3>
        <h3>Temperaments: {prop.temperament}</h3>
        <button>
          <Link to={`/detail/${prop.id}`}>Detail</Link>
        </button>
      </div>
    </div>
  );
};

export default Card;
