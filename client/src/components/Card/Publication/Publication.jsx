import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { URL_BASE } from "../../../utils/const";
import { MdEdit, MdDelete, MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import style from "./Publication.module.css";
import { useDispatch } from "react-redux";
import { getComplexes, getPublications } from "../../../redux/actions";
import { PublicationForm } from "../../";
import { useState } from "react";
import { format, setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";
setDefaultOptions({ locale: es });

export default function Publication({ publication, complex, authUser, handleForm }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const handleDelete = async (type) => {
    Swal.fire({
      title: "Confirmación",
      text: `Confirma ELIMINAR`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (type === "publication") {
          try {
            const response = await axios.delete(`${URL_BASE}/publications/${publication.id}`, {
              headers: { Authorization: authUser.token },
            });
            if (response.status === 200) {
              dispatch(getPublications());
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const response = await axios.delete(`${URL_BASE}/complexes/${complex.id}`, {
              headers: { Authorization: authUser.token },
            });
            if (response.status === 200) {
              dispatch(getComplexes());
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  };

  const handleCheck = async (value, type) => {
    const textAlert = value ? "habilitar" : "deshabilitar";
    Swal.fire({
      title: "Confirmación",
      text: `Confirma ${textAlert}`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateCheck = {
          check: value,
        };
        if (type === "publication") {
          try {
            const response = await axios.patch(`${URL_BASE}/publications/${publication.id}`, updateCheck, {
              headers: { Authorization: authUser.token },
            });
            if (response.status === 200) {
              dispatch(getPublications());
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const response = await axios.patch(`${URL_BASE}/complexes/${complex.id}`, updateCheck, {
              headers: { Authorization: authUser.token },
            });
            if (response.status === 200) {
              dispatch(getComplexes());
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  };

  return publication ? (
    <div className={style.card}>
      <Link
        to={`/noticia/${publication.id}`}
        target={location.pathname === "/dashboard" ? "_blank" : "_self"}
        className={style.data}
      >
        <img src={publication.image} alt={publication.title} />
        <div className={style.cardText}>
          <small>{format(publication.date, "PP")}</small>
          <h3>{publication.title}</h3>
          <p>{publication.description}</p>
        </div>
        <div className={style.cardFooter}>
          <span>{publication.type}</span>
          <p>LEER MÁS</p>
        </div>
      </Link>
      {authUser && (
        <div className={style.buttons}>
          <button className={`${style.btn} ${style.edit}`} name="publication" onClick={(event) => handleForm(event, publication)}>
            <MdEdit />
          </button>

          <button className={`${style.btn} ${style.delete}`} onClick={() => handleDelete("publication")}>
            <MdDelete />
          </button>
          {authUser.rol && (
            <div>
              {publication.check === false ? (
                <button className={`${style.btn} ${style.check}`} onClick={() => handleCheck(true, "publication")}>
                  <MdCheck />
                </button>
              ) : (
                <button className={`${style.btn} ${style.delete}`} onClick={() => handleCheck(false, "publication")}>
                  <RxCross2 />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <div className={style.card}>
      <Link
        to={`/alojamientos/${complex.id}`}
        target={location.pathname === "/dashboard" ? "_blank" : "_self"}
        className={style.data}
      >
        <img src={complex.image} alt={complex.name} />
        <div className={style.cardText}>
          <h3>{complex.name}</h3>
          <p>{complex.address}</p>
          <p>{complex.description}</p>
        </div>
        <div className={style.cardFooter}>
          <p>VER MÁS</p>
        </div>
      </Link>
      {authUser && (
        <div className={style.buttons}>
          <button className={`${style.btn} ${style.edit}`} name="complex" onClick={(event) => handleForm(event, complex)}>
            <MdEdit />
          </button>

          <button className={`${style.btn} ${style.delete}`} onClick={() => handleDelete("complex")}>
            <MdDelete />
          </button>
          {authUser.rol && (
            <div>
              {complex.check === false ? (
                <button className={`${style.btn} ${style.check}`} onClick={() => handleCheck(true, "complex")}>
                  <MdCheck />
                </button>
              ) : (
                <button className={`${style.btn} ${style.delete}`} onClick={() => handleCheck(false, "complex")}>
                  <RxCross2 />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
