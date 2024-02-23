import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Logo1 from "../../assets/logo3.png";
import Logo2 from "../../assets/logo2.png";
import style from "./NavBar.module.css";

export default function NavBar() {
  return (
    <header>
      <nav className={style.navBar}>
        <div className={style.logo}>
          <Link to="/">
            <img src={Logo1} alt="Logo Municipalidad" />
          </Link>
        </div>
        <div className={style.centerNav}>
          <div className={style.links}>
            <Link to="/" className={style.border}>
              Inicio
            </Link>
            <Link to="/servicios" className={style.border}>
              Servicios
            </Link>
            <Link to="/turismo" className={style.border}>
              Turismo
            </Link>
            <Link to="/institucional" className={style.border}>
              Institucional
            </Link>
            <Link to="/concejo" className={style.border}>
              Concejo Deliberante
            </Link>
            <Link to="/contacto" style={{ paddingLeft: "1.5rem" }}>
              Contacto
            </Link>
          </div>
          <div className={style.social}>
            <a href="https://www.facebook.com/p/Municipalidad-de-La-Paz-100064654033886/" target="blank">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/muni.lapaz?igsh=eDk1Y3g3b2tlODhz">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className={style.logo2}>
          <img src={Logo2} alt="Logo Municipalidad" />
        </div>
      </nav>
    </header>
  );
}
