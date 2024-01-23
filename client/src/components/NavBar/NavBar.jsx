import { Link, Routes, Route } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import style from "./NavBar.module.css";
import Contacts from "../../views/Contact/Contacts";

export default function NavBar() {
  return (
    <header>
      <nav className={style.navBar}>
        <div className={style.logo}>
          <Link to="/">
            <img src={Logo} alt="Logo Municipalidad" />
          </Link>
        </div>
        <div className={style.centerNav}>
          <div className={style.links}>
            <Link to="/" className={style.border}>
              INICIO
            </Link>
            <Link to="/servicios" className={style.border}>
              SERVICIOS
            </Link>
            <Link to="/turismo" className={style.border}>
              TURISMO
            </Link>
            <Link to="/intitucional" className={style.border}>
              INSTITUCIONAL
            </Link>
            <Link to="/concejo" className={style.border}>
              CONCEJO DELIBERANTE
            </Link>
            <Link to="/contacto" style={{ paddingLeft: "1.5rem" }}>
              CONTACTO
            </Link>
          </div>
        </div>
        <div className={style.social}>
          <a href="https://www.facebook.com/p/Municipalidad-de-La-Paz-100064654033886/" target="blank">
            <FaFacebookF />
          </a>
          <a href="">
            <FaInstagram />
          </a>
        </div>
      </nav>
    </header>
  );
}
