import React from "react";

import { BiSearchAlt } from "react-icons/bi";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={style.searchBar}>
      <input type="text" placeholder="Buscar" />
      <BiSearchAlt className={style.icon} />
    </div>
  );
}
