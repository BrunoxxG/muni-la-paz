import usePublication from "../../../hooks/usePublication";
import { useNavigate } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

import style from "./PublicationDetail.module.css";

export default function PublicationDetail() {
  const publication = usePublication();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className={style.container}>
      <button onClick={handleBack}>
        <FaCircleArrowLeft size={30} />
      </button>
      <div>
        <h1>{publication?.title}</h1>
        <img src={publication?.image} alt={publication.title} />
        <p>Descripcion: {publication.description}</p>
        <span>Fecha: {publication.date}</span>
      </div>
    </div>
  );
}
