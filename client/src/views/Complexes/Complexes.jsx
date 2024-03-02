import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

import style from "./Complexes.module.css";
import { getComplexesByName } from "../../redux/actions";
import { Publication, SearchBar } from "../../components";

export default function Complexes({complexes}) {

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(getComplexesByName(value));
  };

  return (
    <div className={style.container}>
      <SearchBar handleChange={handleChange} />
      <Link to="/">
        <span><FaCircleArrowLeft size={30}/></span>
      </Link>
      <div className={style.grid}>
        {complexes?.map((complex, index) => (
          <Publication key={index} complex={complex} />
        ))}
      </div>
    </div>
  );
}
