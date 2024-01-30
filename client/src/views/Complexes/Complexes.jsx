import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import style from "./Complexes.module.css";
import { getComplexes } from "../../redux/actions";
import { Publication } from "../../components";

export default function Complexes() {

  const dispatch = useDispatch();
  const allComplexes = useSelector((state) => state.complexes);

  useEffect(() => {
    dispatch(getComplexes());
  }, []);

  return (
    <div className={style.container}>
      <Link to="/">
        <span> volver</span>
      </Link>
      <div className={style.grid}>
        {allComplexes?.map((complex, index) => (
          <Publication key={index} complex={complex} />
        ))}
      </div>
    </div>
  );
}
