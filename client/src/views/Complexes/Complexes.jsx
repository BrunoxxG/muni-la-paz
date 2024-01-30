import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import style from "./Complexes.module.css";
import { getComplexes } from "../../redux/actions";

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
      <div>
        {allComplexes?.map((complex, index) => (
          <div id={`#${complex?.id}`} key={index}>
            <h1>{complex?.name}</h1>
            <img src={complex?.image} alt={complex?.id} />
            <p>Descripcion: {complex?.description}</p>
            <span>Direccion: {complex?.address}</span>
            <p>Contacto: {complex?.contact}</p>
            <Link to={`/alojamientos/${complex?.id}`}>VER MAS</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
