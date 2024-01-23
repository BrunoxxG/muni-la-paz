import { Link, Routes, Route } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import style from "./NavBar.module.css";
import Contacts from "../../views/Contact/Contacts";

export default function NavBar() {
  return (
    <header>
      <div className={style.social}>
        <a href="https://www.facebook.com/p/Municipalidad-de-La-Paz-100064654033886/" target="blank">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/muni.lapaz?igsh=eDk1Y3g3b2tlODhz">
          <FaInstagram />
        </a>
      </div>
      <nav className={style.navBar}>
        <div className={style.logo}>
          <Link to="/">
            <img src={Logo} alt="Logo Municipalidad" />
          </Link>
        </div>
        <div className={style.rightNav}>
          <div className={style.links}>
            <Link to="/" className={style.border}>
              INICIO
            </Link>
            <Link to="/noticias" className={style.border}>
              NOTICIAS
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
            <Link to="/concejo" style={{ paddingLeft: "1.5rem" }}>
              CONCEJO DELIBERANTE
            </Link>
            <Link to="/contacto" style={{ paddingLeft: "1.5rem" }}>
              CONTACTO
            </Link>
            <Routes>
              <Route path="/contacto" element={<Contacts />} />
            </Routes>
          </div>
        </div>
      </nav>
    </header>
  );
}
