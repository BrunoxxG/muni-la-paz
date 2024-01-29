import React from 'react';
import { SearchBar } from '../..';

import style from "./ComplexesDashboard.module.css";

export default function ComplexesDashboard() {
  return (
    <div className={style.topSection} >
      <SearchBar  />  
      COMPLEXES
    </div>
  );
}