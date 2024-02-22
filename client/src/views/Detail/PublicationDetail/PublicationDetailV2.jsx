import usePublication from "../../../hooks/usePublication";
import { useNavigate } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

import style from "./PublicationDetail.module.css";
import { URL_BASE } from "../../../utils/const";

export default function PublicationDetail() {
  const publication = usePublication();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  if (!publication) {
    return (
      <div>
        <h2>Cargando</h2>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <button onClick={handleBack}>
        <FaCircleArrowLeft size={30} />
      </button>
      <div>
        <h1>{publication.title}</h1>
        {publication.images && publication.images.length > 0 && (
          <img src={URL_BASE + publication.images[0]} alt={publication.title} />
        )}
        <p>Descripcion: {publication.description}</p>
        <span>Fecha: {publication.date}</span>
      </div>
    </div>
  );
}