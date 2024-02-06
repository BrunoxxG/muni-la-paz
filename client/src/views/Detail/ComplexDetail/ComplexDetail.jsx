import useComplex from "../../../hooks/useComplex";
import { useNavigate } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

import style from "./ComplexDetail.module.css";

const ComplexDetail = () => {
  const complex = useComplex();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className={style.container}>
      <button onClick={handleBack}><FaCircleArrowLeft size={30}/></button>
      <div>
        <h1>{complex?.name}</h1>
        <img src={complex?.image} alt={complex.name} />
        <p>Descripcion: {complex.description}</p>
        <span>Direccion: {complex.address}</span>
        <p>Contacto: {complex.contact}</p>
      </div>
    </div>
  );
};

export default ComplexDetail;
