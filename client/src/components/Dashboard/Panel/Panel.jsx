import React, { useState } from "react";
import { ComplexForm, Publication, PublicationForm, User, UserForm } from "../../";
import { IoIosAddCircle } from "react-icons/io";
import style from "./Panel.module.css";

export default function Panel({ authUser, publications, complexes, users }) {
  const [viewForm, setViewForm] = useState({
    visible: false,
    form: "",
    data: {}
  });

  publications = publications.filter((item) => !item.check);
  complexes = complexes.filter((item) => !item.check);
  users = users.filter((item) => !item.active);

  const handleForm = (event, item) => {
    event.stopPropagation(); 
    const dataItem = item
    const formActive = event.currentTarget.name
    if (formActive === "cancel") {
      setViewForm({
        visible: false,
        form: formActive,
        data: {},
      });
    } else {
      setViewForm({
        visible: true,
        form: formActive,
        data: dataItem
      });
    }
  };

  if (viewForm.visible) {
    return (
      <div>
        {viewForm.form === "publication" && <PublicationForm publication={viewForm.data} authUser={authUser} />}
        {viewForm.form === "complex" && <ComplexForm complex={viewForm.data} authUser={authUser} />}
        {viewForm.form === "user" && <UserForm user={viewForm.data} authUser={authUser} />}
        <button className={style.btnAccess} name="cancel" onClick={handleForm}>
          <p>CANCELAR</p>
        </button>
      </div>
    );
  }

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
                <Publication key={index} publication={publication} authUser={authUser} handleForm={handleForm}/>
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
                <Publication key={index} complex={complex} authUser={authUser} handleForm={handleForm}/>
              ))}
            </div>
          ) : (
            <h2>No hay alojamientos para revisar</h2>
          )}
        </div>
        {authUser.rol && (
          <div className={style.listDiv}>
            <div className={style.heading}>
              <h3>Usuarios en revisión</h3>
            </div>
            {users.length !== 0 ? (
              <div className={style.usersContainer}>
                {users?.map(
                  (user, index) => user.email !== authUser.email && <User key={index} user={user} authUser={authUser} handleForm={handleForm}/>
                )}
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
          <button className={style.btnAccess} name="publication" onClick={handleForm}>
            <p>CREAR PUBLICACION</p> <IoIosAddCircle className={style.icon} />
          </button>

          <button className={style.btnAccess} name="complex" onClick={handleForm}>
            <p>CREAR ALOJAMIENTO</p> <IoIosAddCircle className={style.icon} />
          </button>

          {authUser.rol && (
            <button className={style.btnAccess} name="user" onClick={handleForm}>
              <p>CREAR USUARIO</p> <IoIosAddCircle className={style.icon} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
