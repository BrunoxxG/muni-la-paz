import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./Publications.module.css";
import { Pagination, Publication, SearchBar } from "../../components";
import { filteredPublications, setCurrentPage } from "../../redux/actions";
import usePaginate from "../../hooks/usePaginate";

export default function Publications() {
  const { publications } = usePaginate();

  const [filters, setFilters] = useState({
    type: "TODAS LAS CATEGORIAS",
    date: "TODAS",
    search: "",
  });

  const allTypes = [
    "TODAS LAS CATEGORIAS",
    "General",
    "Salud",
    "Institucional",
    "Deporte",
    "Concejo",
    "Cultura",
    "Servicio",
  ];
  const allDates = ["TODAS", "HOY", "ULTIMOS 3 DIAS", "ULTIMA SEMANA", "ULTIMO MES"];

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [e.target.name]: e.target.value.trim(),
      };
    });
    dispatch(setCurrentPage(1));
    dispatch(filteredPublications({ ...filters, search: e.target.value.trim() }));
  };

  const handleChangeInput = (e) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [e.target.name]: e.target.value,
      };
    });
    dispatch(setCurrentPage(1));
    if (e.target.name === "type") {
      dispatch(filteredPublications({ ...filters, type: e.target.value }));
    } else {
      dispatch(filteredPublications({ ...filters, date: e.target.value }));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h2>
          Todas<br></br>
          <span>Las Noticias</span>
        </h2>
      </div>
      <div className={style.filters}>
        <div className={style.divInput}>
          <label>
            <select name="date" value={filters.date} onChange={handleChangeInput}>
              {allDates?.map((date, index) => {
                return <option key={index}>{date}</option>;
              })}
            </select>
          </label>
        </div>
        <div className={style.divInput}>
          <label>
            <select name="type" value={filters.type} onChange={handleChangeInput}>
              {allTypes?.map((type, index) => {
                return <option key={index}>{type}</option>;
              })}
            </select>
          </label>
        </div>
        <div className={style.search}>
          <SearchBar handleChange={handleChange} />
        </div>
      </div>
      <div className={style.grid}>
        {publications?.map((publication, index) => (
          <Publication key={index} publication={publication} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
