import React, { useEffect } from "react";
import { Publication, SearchBar } from "../../";

import style from "./Notices.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPublications } from "../../../redux/actions";

export default function Notices() {
  const allPublications = useSelector((state) => state.publications);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPublications());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.noticesSection}>
      <div className={style.SearchBar}>
        <SearchBar />
      </div>
      <div className={style.gridDiv}>
        <h2>TODAS LAS NOTICIAS</h2>
        <div className={style.publications}>
          {allPublications?.map(
            (publication, index) => index > 0 && <Publication key={index} publication={publication} />
          )}
        </div>
      </div>
    </div>
  );
}
