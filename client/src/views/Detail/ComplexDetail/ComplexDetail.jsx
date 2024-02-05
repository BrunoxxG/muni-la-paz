import useComplex from '../../../hooks/useComplex';
import { useNavigate } from 'react-router-dom';

import style from "./ComplexDetail.module.css";

const ComplexDetail = ({complexes}) => {

  console.log(complexes)

  const complex = useComplex();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  if (!complex) {
    return (
      <div className={style.container}>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <button onClick={handleBack}>
        Volver
      </button>
      <div>
        <h1>{complex.name}</h1>
        <img src={complexes[2]?.image} alt={complex.name} />
        <p>Descripcion: {complex.description}</p>
        <span>Direccion: {complex.address}</span>
        <p>Contacto: {complex.contact}</p>
      </div>
    </div>
  );
};


export default ComplexDetail;
