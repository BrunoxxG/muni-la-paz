import React from "react";
import { Link } from "react-router-dom";

import style from "./Footer.module.css";
import { BiSolidLock } from "react-icons/bi";

export default function Footer() {
  return (
    <footer>
      <div className={style.topFooter}>
        <a href="tel:03544496010" className={style.contact}>
          <span>3544-496010</span>
          <p>atención al vecino</p>
        </a>
        <a href="tel:03544496600" className={style.contact}>
          <span>3544-496600</span>
          <p>comisaria</p>
        </a>
        <a href="tel:100" className={style.contact}>
          <span>100</span>
          <p>bomberos</p>
        </a>
        <Link className={style.contact}>
          <span><BiSolidLock size={60}/></span>
          <p>personal municipal</p>
        </Link>
      </div>
      <div className={style.bottomFooter}>
        <div className={style.contentBottomFooter}>
          <Link>
            www.<b>lapazcba</b>.gob.ar
          </Link>
          <span>Direccion</span>
        </div>
      </div>
    </footer>
  );
}
