import React from "react";
import { MdEdit, MdDelete, MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import style from "./User.module.css";

const User = ({ user }) => {
  const handleActive = () => {};

  const handleDelete = () => {};

  return (
    <div className={style.card}>
      <h3>{user.name}</h3>
      <h4>{user.email}</h4>
      <p>{user.rol}</p>
      <div className={style.buttons}>
        <button className={`${style.btn} ${style.edit}`}>
          <MdEdit />
        </button>

        <button className={`${style.btn} ${style.delete}`} onClick={() => handleDelete()}>
          <MdDelete />
        </button>
        {user.active === false ? (
          <button className={`${style.btn} ${style.check}`} onClick={() => handleActive(true)}>
            <MdCheck />
          </button>
        ) : (
          <button className={`${style.btn} ${style.delete}`} onClick={() => handleActive(false)}>
            <RxCross2 />
          </button>
        )}
      </div>
    </div>
  );
};

export default User;
