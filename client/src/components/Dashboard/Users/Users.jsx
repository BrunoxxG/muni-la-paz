import React from "react";
import { SearchBar, User } from "../..";
import { useDispatch } from "react-redux";

import style from "./Users.module.css";
import { getUsersByName } from "../../../redux/actions";

export default function Users({ users, authUser }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(getUsersByName(value, authUser.token));
  };

  return (
    <div className={style.usersSection}>
      <h2>TODOS LOS USUARIOS</h2>
      <div className={style.gridDiv}>
        <div className={style.SearchBar}>
          <SearchBar handleChange={handleChange} />
        </div>
        <div className={style.users}>
          {users?.map((user, index) => user.email !== authUser.email && (
            <User key={index} user={user} authUser={authUser} />
          ))}
        </div>
      </div>
    </div>
  );
}