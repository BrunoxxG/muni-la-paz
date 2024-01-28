import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getComplexes } from "../../redux/actions";
import style from "./DetailComplex.module.css";

const DetailComplex = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allComplexes = useSelector((state) => state.complexes);

  useEffect(() => {
    dispatch(getComplexes());
  }, [dispatch]);

  useEffect(() => {
    const element = document.getElementById(`#${id??2}`); // Reemplaza 'tuId' con el id del elemento al que deseas hacer scroll

    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // 'smooth' proporciona un desplazamiento suave
    }
  }, []);

  return (
    <div className={style.Container}>
      <Link to="/">
        <span> volver</span>
      </Link>
      <div className="">
        {allComplexes?.map((complexes, index) => (
          <div id={`#${complexes.id}`}>
            <h1>{complexes.name}</h1>
            <img src={complexes?.image} alt={complexes?.id} />
            <p>Descripcion: {complexes.description}</p>
            <span>Direccion: {complexes.address}</span>
            <p>Contacto: {complexes.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailComplex;
