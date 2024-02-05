import React from "react";
import { Publication, PublicationForm } from "../../";
import { Drawer } from "vaul";
import style from "./Panel.module.css";
import { BsArrowRightShort } from "react-icons/bs";

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
          <div className={style.itemsContainer}>
            {publications.length !== 0 ? (
              publications?.map((publication, index) => (
                <Publication key={index} publication={publication} user={user} />
              ))
            ) : (
              <h2>No hay publicaciones para revisar</h2>
            )}
          </div>
        </div>
        <div className={style.listDiv}>
          <div className={style.heading}>
            <h3>Alojamientos en revisión</h3>
          </div>
          <div className={style.itemsContainer}>
            {complexes.length !== 0 ? (
              complexes?.map((publication, index) => <Publication key={index} publication={publication} user={user} />)
            ) : (
              <h2>No hay alojamientos para revisar</h2>
            )}
          </div>
        </div>
        {user.rol && (
          <div className={style.listDiv}>
            <div className={style.heading}>
              <h3>Usuarios en revisión</h3>
            </div>
            <div className={style.itemsContainer}>
              {users.length !== 0 ? (
                users?.map((user, index) => (
                  <div key={index}>
                    <h2>{user.name}</h2>
                    <h3>{user.email}</h3>
                  </div>
                ))
              ) : (
                <h2>No hay usuarios para revisar</h2>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={style.rightDiv}>
        <div className={style.heading}>
          <h3>Accesos Rápidos</h3>
        </div>
        <div className={style.buttonsAccess}>
          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
              <button className={style.btnAccess}>CREAR PUBLICACION</button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className={style.overlay} />
              <Drawer.Content className={style.contentDraw}>
                <div>
                  <div className={style.deslized} />
                  <PublicationForm />
                </div>
              </Drawer.Content>
              <Drawer.Overlay />
            </Drawer.Portal>
          </Drawer.Root>
          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
              <button className={style.btnAccess}>CREAR ALOJAMIENTO</button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className={style.overlay} />
              <Drawer.Content className={style.contentDraw}>
                <div>
                  <div className={style.deslized} />
                  <h1>CREATE COMPLEX</h1>
                </div>
              </Drawer.Content>
              <Drawer.Overlay />
            </Drawer.Portal>
          </Drawer.Root>

          {user.rol && (
            <Drawer.Root shouldScaleBackground>
              <Drawer.Trigger asChild>
                <button className={style.btnAccess}>CREAR USUARIO</button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className={style.overlay} />
                <Drawer.Content className={style.contentDraw}>
                  <div>
                    <div className={style.deslized} />
                    <h1>CREATE USER</h1>
                  </div>
                </Drawer.Content>
                <Drawer.Overlay />
              </Drawer.Portal>
            </Drawer.Root>
          )}
        </div>
      </div>
    </div>
  );
}
