import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

import style from "./Publications.module.css";
import { Publication } from "../../components";

export default function Publications({publications}) {

  return (
    <div className={style.container}>
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
