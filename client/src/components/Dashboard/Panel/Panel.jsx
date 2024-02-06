import React from "react";
import { ComplexForm, Publication, PublicationForm } from "../../";
import style from "./Panel.module.css";

export default function Panel({ user, publications, complexes, users }) {
  publications = publications.filter((item) => !item.check);
  complexes = complexes.filter((item) => !item.check);
  users = users.filter((item) => !item.active);

  return (
    <div className={style.panelSection}>
      <div className={style.leftDiv}>
        <div className={style.listDiv}>
          <div className={style.heading}>
            <h3>Publicaciones en revisión</h3>
          </div>

          {publications?.length !== 0 ? (
            <div className={style.itemsContainer}>
              {publications?.map((publication, index) => (
                <Publication key={index} publication={publication} user={user} />
              ))}
            </div>
          ) : (
            <h2>No hay publicaciones para revisar</h2>
          )}
        </div>
        <div className={style.listDiv}>
          <div className={style.heading}>
            <h3>Alojamientos en revisión</h3>
          </div>
          {complexes.length !== 0 ? (
            <div className={style.itemsContainer}>
              {complexes?.map((complex, index) => (
                <Publication key={index} complex={complex} user={user} />
              ))}
            </div>
          ) : (
            <h2>No hay alojamientos para revisar</h2>
          )}
        </div>
        {user.rol && (
          <div className={style.listDiv}>
            <div className={style.heading}>
              <h3>Usuarios en revisión</h3>
            </div>
            {users.length !== 0 ? (
              <div className={style.usersContainer}>
                {users?.map((user, index) => (
                  <div key={index}>
                    <h2>{user.name}</h2>
                    <h3>{user.email}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <h2>No hay usuarios para revisar</h2>
            )}
          </div>
        )}
      </div>
      <div className={style.rightDiv}>
        <div className={style.heading}>
          <h3>Accesos Rápidos</h3>
        </div>
        <div className={style.buttonsAccess}>
          <button className={style.btnAccess}>CREAR PUBLICACION</button>

          <button className={style.btnAccess}>CREAR ALOJAMIENTO</button>

          {user.rol && <button className={style.btnAccess}>CREAR USUARIO</button>}
        </div>
      </div>
    </div>
  );
}
