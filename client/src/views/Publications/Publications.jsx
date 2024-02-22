import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

import style from "./Publications.module.css";
import { Publication, SearchBar } from "../../components";
import { getPublicationsByTitle } from "../../redux/actions";


export default function Publications({publications}) {

const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(getPublicationsByTitle(value));
  };

  return (
    <div className={style.container}>
      <SearchBar handleChange={handleChange} />
      <Link to="/">
        <span><FaCircleArrowLeft size={30}/></span>
      </Link>
      <div className={style.grid}>
        {publications?.map((publication, index) => (
          <Publication key={index} publication={publication} />
        ))}
      </div>
    </div>
  );
}
