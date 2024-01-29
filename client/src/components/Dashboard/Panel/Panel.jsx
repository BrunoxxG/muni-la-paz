import React from "react";

import style from "./Panel.module.css";
import { BsArrowRightShort } from "react-icons/bs";

export default function Panel({ user }) {
  return (
    <div className={style.panelSection}>
      <div className={style.leftDiv}>
        <div className={style.listDiv}>
          <div className={style.heading}>
            <h3>Noticias en revisión</h3>
            <button className={style.btn}>
              Ver Todas <BsArrowRightShort className={style.icon} />
            </button>
          </div>
          <div className={style.itemsContainer}></div>
        </div>
        <div className={style.listDiv}>
          <div className={style.heading}>
            <h3>Alojamientos en revisión</h3>
            <button className={style.btn}>
              Ver Todos <BsArrowRightShort className={style.icon} />
            </button>
          </div>
          <div className={style.itemsContainer}></div>
        </div>
        {user.rol && (
          <div className={style.listDiv}>
            <div className={style.heading}>
              <h3>Usuarios en revisión</h3>
              <button className={style.btn}>
                Ver Todas <BsArrowRightShort className={style.icon} />
              </button>
            </div>
            <div className={style.itemsContainer}></div>
          </div>
        )}
      </div>
      <div className={style.rightDiv}>
        <div className={style.heading}>
          <h3>Accesos Rápidos</h3>
        </div>
        <div className={style.itemsContainer}></div>
      </div>
    </div>
  );
}
