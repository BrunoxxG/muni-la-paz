import React from 'react';
import { Publication, SearchBar } from "../..";
import { useDispatch } from "react-redux";
import { getComplexesByName } from "../../../redux/actions";

import style from "./ComplexesDashboard.module.css";

export default function ComplexesDashboard({complexes, user}) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(getComplexesByName(value));
  };

  return (
    <div className={style.noticesSection}>
      <h2>TODOS LOS ALOJAMIENTOS</h2>
      <div className={style.gridDiv}>
        <div className={style.SearchBar}>
          <SearchBar handleChange={handleChange} />
        </div>
        <div className={style.publications}>
          {complexes?.map((complex, index) => (
            <Publication key={index} complex={complex} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}