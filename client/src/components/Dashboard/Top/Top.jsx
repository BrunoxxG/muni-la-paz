import React from "react";

import { MdOutlineNotificationsNone } from "react-icons/md";
import style from "./Top.module.css";

export default function Top({ notifications, authUser }) {
  return (
    <div className={style.topSection}>
      <div className={style.headerSection}>
        <div className={style.title}>
          <h1>Bienvenido al Panel de Control</h1>
        </div>
        {authUser.rol && (
          <div className={style.notificationDiv}>
            <MdOutlineNotificationsNone className={style.icon} />
            {notifications > 0 && (
              <div className={style.number}>
                <p>{notifications}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
