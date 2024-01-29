import React from 'react';
import { SearchBar } from '../../';

import style from "./Users.module.css";

export default function Users() {
  return (
    <div className={style.topSection} >
      <SearchBar />
      USERS
    </div>
  );
}