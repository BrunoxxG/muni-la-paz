import { Carrousel } from "../../components";
import { Link } from "react-router-dom";

import style from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <div className={style.hero}></div>
      <div className={style.carrousel}>
        <Carrousel />
      </div>
      <div className={style.content}>
        <div className={style.notices}>
          <h2>NOTICES</h2>
        </div>
        <div className={style.events}>
          <div className={style.textEvents}>
            <h2>EVENTOS</h2>
            <h3>Conocé todo lo que sucede en la ciudad</h3>
          </div>
          <Link to="/eventos">VER MÁS</Link>
        </div>
        <div className={style.notices}>
          <h2>SERVICIOS</h2>
        </div>
        <div className={style.tourism}>
          <div className={style.textEvents}>
            <h2>TURISMO</h2>
            <h3>Si viajás o llegaste a la ciudad visitá nuestra web turística</h3>
          </div>
          <Link to="/eventos">VER MÁS</Link>
        </div>
      </div>
    </div>
  );
}
