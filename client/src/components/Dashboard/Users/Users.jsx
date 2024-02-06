import React from "react";
import { SearchBar } from "../..";
import { useDispatch } from "react-redux";

import style from "./Users.module.css";
import { getUsersByName } from "../../../redux/actions";

export default function Users({ users, userActive }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(getUsersByName(value, userActive.token));
  };

  return (
    <div className={style.noticesSection}>
      <h2>TODOS LOS USUARIOS</h2>
      <div className={style.gridDiv}>
        <div className={style.SearchBar}>
          <SearchBar handleChange={handleChange} />
        </div>
        <div className={style.publications}>
          {users?.map((user, index) => user.email !== userActive.email && (
            <div key={index}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.rol}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}