import React, { useState } from "react";

import { FaUsers, FaUser } from "react-icons/fa";
import { MdDashboardCustomize, MdCabin, MdOutlineLibraryBooks } from "react-icons/md";
import logo from "../../../assets/logo.png";
import style from "./SideBar.module.css";

export default function SideBar({ user, signOut, onLinkClick }) {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    if (onLinkClick) {
      onLinkClick(link);
    }
    setActiveLink(link);
  };

  return (
    <div className={style.sideBar}>
      <a href="/" target="_blank" className={style.logoDiv}>
        <img src={logo} alt="Image Logo" />
        <h2>Municipalidad de La Paz</h2>
      </a>
      <div className={style.menuDiv}>
        <h3 className={style.divTitle}>MENU</h3>
        <ul className={style.menuList}>
          <li
            className={`${style.listItem} ${activeLink === "" ? style.active : ""}`}
            onClick={() => handleLinkClick("")}
          >
            <div className={style.menuLink}>
              <MdDashboardCustomize className={style.icon} />
              <span className={style.smallText}>Panel</span>
            </div>
          </li>
          <li
            className={`${style.listItem} ${activeLink === "notices" ? style.active : ""}`}
            onClick={() => handleLinkClick("notices")}
          >
            <div className={style.menuLink}>
              <MdOutlineLibraryBooks className={style.icon} />
              <span className={style.smallText}>Noticias</span>
            </div>
          </li>
          <li
            className={`${style.listItem} ${activeLink === "complexes" ? style.active : ""}`}
            onClick={() => handleLinkClick("complexes")}
          >
            <div className={style.menuLink}>
              <MdCabin className={style.icon} />
              <span className={style.smallText}>Alojamientos</span>
            </div>
          </li>
          {user.rol && (
            <li
              className={`${style.listItem} ${activeLink === "users" ? style.active : ""}`}
              onClick={() => handleLinkClick("users")}
            >
              <div className={style.menuLink}>
                <FaUsers className={style.icon} />
                <span className={style.smallText}>Usuarios</span>
              </div>
            </li>
          )}
        </ul>
      </div>
      <div className={style.sideBarCard}>
        <div className={style.circle}></div>
        <FaUser className={style.icon} />
        <div className={style.cardContent}>
          <h3>{user.name}</h3>
          {user.rol && <h4>{user.rol}</h4>}
          <p>{user.email}</p>
          <button onClick={signOut} className={style.btn}>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}
