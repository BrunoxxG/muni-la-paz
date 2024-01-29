import React from "react";

import { BiSearchAlt } from "react-icons/bi";
import style from "./SearchBar.module.css";

export default function SearchBar({ handleChange }) {
  return (
    <div className={style.searchBar}>
      <input type="search" onChange={handleChange} placeholder="Buscar" />
      <BiSearchAlt className={style.icon} />
    </div>
  );
}
