import { Carousel, Publication } from "../../components";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { MdCabin, MdOutlineLibraryBooks, MdEvent, MdSportsSoccer } from "react-icons/md";
import { FaHeartbeat, FaBook, FaRegCalendarAlt } from "react-icons/fa";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComplexes, getPublications } from "../../redux/actions";

import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  const allPublications = useSelector((state) => state.publications);
  const publications = allPublications.filter((publication) => publication.check).slice(0, 4);

  useEffect(() => {
    dispatch(getComplexes()).then(() => dispatch(getPublications()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div className={style.carrousel}>
        <Carousel />
      </div>
      <div className={style.navCenter}>
        <Link className={style.buttonNavCenter}>
          <MdCabin size={50} />
          <span>ALOJAMIENTO</span>
        </Link>
        <Link className={style.buttonNavCenter}>
          <FaBook size={50} />
          <span>CULTURA</span>
        </Link>
        <Link className={style.buttonNavCenter}>
          <FaHeartbeat size={50} />
          <span>SALUD</span>
        </Link>
        <Link className={style.buttonNavCenter}>
          <MdSportsSoccer size={50} />
          <span>DEPORTE</span>
        </Link>
        <Link to='/noticias' className={style.buttonNavCenter}>
          <MdOutlineLibraryBooks size={50} />
          <span>NOTICIAS</span>
        </Link>
        <Link className={style.buttonNavCenter}>
          <MdEvent size={50} />
          <span>EVENTOS</span>
        </Link>
      </div>
      <section className={style.notices}>
        <div className={style.titleNotices}>
          <h2>
            Últimas<br></br>
            <span>Noticias</span>
          </h2>
          <Link>
            Más noticias <FaArrowRight size={25} />
          </Link>
        </div>
        <div className={style.firstNotice}>
          <div className={style.firstNoticeImg}>
            <img src={publications[0]?.image} alt={publications[0]?.id} />
          </div>
          <div className={style.firstNoticeText}>
            <div className={style.firstNoticeTextTop}>
              <small>{publications[0]?.date}</small>
              <Link to={`/detail/${publications[0]?.id}`} className={style.link}>
                <h3>{publications[0]?.title}</h3>
              </Link>
              <p>{publications[0]?.description}</p>
            </div>
            <Link to={`/noticia/${publications[0]?.id}`} className={style.link}>
              <label>LEER MÁS</label>
            </Link>
          </div>
        </div>
        <div className={style.publications}>
          {publications?.map((publication, index) => index > 0 && <Publication key={index} publication={publication} />)}
        </div>
      </section>
      <section className={style.events}>
        <div className={style.contentEvents}>
          <div className={style.titleEvents}>
            <h2>
              Agenda<br></br>
              <span>de la Localidad de La Paz</span>
            </h2>
          </div>
          <div className={style.nextEvents}>
            <Link to="/eventos" className={style.topNextEvents}>
              <div className={style.textNextEvents}>
                <FaRegCalendarAlt size={40} />
                <span>Próximos Eventos</span>
              </div>
              <FaArrowRight size={30} />
            </Link>
            <div className={style.cardEvents}></div>
          </div>
        </div>
      </section>
      <section className={style.tourism}>
        <div className={style.titleNotices}>
          <h2>
            Alojamiento<br></br>
            <span>Si viajás o llegaste</span>
          </h2>
          <Link>
            Más alojamientos <FaArrowRight size={25} />
          </Link>
        </div>
        <div className={style.publications}>
          
        </div>
      </section>
    </main>
  );
}
