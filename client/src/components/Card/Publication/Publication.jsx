import { Link } from "react-router-dom";
import axios from "axios";
import { URL_BASE } from "../../../utils/const";

import { MdEdit, MdDelete, MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import style from "./Publication.module.css";
import { useDispatch } from "react-redux";
import { getPublications } from "../../../redux/actions";

export default function Publication({ publication, user, complexes }) {
  const dispatch = useDispatch();
  
  

  const handleEdit = async () => {
    
  };

  const handleDelete = async () => {
    
  };

  const handleCheck = async (value) => {
    const updatePublication = {
      check: value,
    };
    try {
      const response = await axios.patch(`${URL_BASE}/publications/${publication.id}`, updatePublication, {
        headers: { Authorization: user.token },
      });
      if (response.status === 200) {
        dispatch(getPublications());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    publication ? 
    <div className={style.card}>
      <img src={publication.image} alt={publication.title} />
      <div className={style.cardText}>
        <small>{publication.date}</small>
        <Link to={`/detail/${publication.id}`} className={style.link}>
          <h3>{publication.title}</h3>
        </Link>
        <p>{publication.description}</p>
      </div>
      <div className={style.cardFooter}>
        <span>{publication.type}</span>
        <Link to={`/noticia/${publication.id}`} className={style.link}>
          <label>LEER MÁS</label>
        </Link>
      </div>
      {user && (
        <div className={style.buttons}>
          <button className={`${style.btn} ${style.edit}`}>
            <MdEdit />
          </button>
          <button className={`${style.btn} ${style.delete}`}>
            <MdDelete />
          </button>
          {user.rol && publication.check === false ? (
            <button className={`${style.btn} ${style.check}`} onClick={() => handleCheck(true)}>
              <MdCheck />
            </button>
          ) : (
            <button className={`${style.btn} ${style.delete}`} onClick={() => handleCheck(false)}>
              <RxCross2 />
            </button>
          )}
        </div>
      )}
    </div>
    :
    <div className={style.card}>
      <img src={complexes.image} alt={complexes.name} />
      <div className={style.cardText}>
        <Link to={`/detail/${complexes.id}`} className={style.link}>
          <h3>{complexes.name}</h3>
        </Link>
        <p>{complexes.address}</p>
        <p>{complexes.description}</p>
      </div>
      <div className={style.cardFooter}>
        {/* <span>{complexes.type}</span> */}
        <Link to={`/alojamientos/${complexes.id}`} className={style.link}>
          <label>LEER MÁS</label>
        </Link>
      </div>
    </div>
  );
}
