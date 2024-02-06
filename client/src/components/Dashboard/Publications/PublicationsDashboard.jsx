import React from "react";
import { Publication, SearchBar } from "../..";
import { useDispatch } from "react-redux";

import style from "./PublicationsDashboard.module.css";
import { getPublicationsByTitle } from "../../../redux/actions";

export default function PublicationsDasboard({ publications, authUser }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(getPublicationsByTitle(value));
  };

  return (
    <div className={style.publicationsSection}>
      <h2>TODAS LAS PUBLICACIONES</h2>
      <div className={style.gridDiv}>
        <div className={style.SearchBar}>
          <SearchBar handleChange={handleChange} />
        </div>
        <div className={style.publications}>
          {publications?.map((publication, index) => (
            <Publication key={index} publication={publication} authUser={authUser} />
          ))}
        </div>
      </div>
    </div>
  );
}
