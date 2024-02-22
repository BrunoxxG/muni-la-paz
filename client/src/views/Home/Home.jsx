import { Carousel, Publication } from "../../components";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { MdCabin, MdOutlineLibraryBooks, MdEvent, MdSportsSoccer } from "react-icons/md";
import { FaHeartbeat, FaBook, FaRegCalendarAlt } from "react-icons/fa";
import { format, setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";
setDefaultOptions({ locale: es });


import style from "./Home.module.css";

export default function Home({publications, complexes}) {
  const filteredPublications = publications.filter((publication) => publication.check && publication.type !== "Eventos").slice(0, 4);
  const filteredComplexes = complexes.filter((complexes) => complexes.check).slice(0, 3);
  const events = publications.filter((publication) => publication.check && publication.type === "Deportes").slice(0, 4);

  return (
    <main>
      <div className={style.carrousel}>
        <Carousel />
      </div>
      <div className={style.navCenter}>
        <Link to="/alojamientos" className={style.buttonNavCenter}>
          <MdCabin size={70} />
          <span>Alojamientos</span>
        </Link>
        <Link to="/cultura" className={style.buttonNavCenter}>
          <FaBook size={70} />
          <span>Cultura</span>
        </Link>
        <Link to="/salud" className={style.buttonNavCenter}>
          <FaHeartbeat size={70} />
          <span>Salud</span>
        </Link>
        <Link to="/deportes" className={style.buttonNavCenter}>
          <MdSportsSoccer size={70} />
          <span>Deportes</span>
        </Link>
        <Link to='/noticias' className={style.buttonNavCenter}>
          <MdOutlineLibraryBooks size={70} />
          <span>Noticias</span>
        </Link>
        <Link to="/eventos" className={style.buttonNavCenter}>
          <MdEvent size={70} />
          <span>Eventos</span>
        </Link>
      </div>
      <section className={style.notices}>
        <div className={style.titlePublications}>
          <h2>
            Últimas<br></br>
            <span>Noticias</span>
          </h2>
          <Link to="/noticias">
            Más noticias <FaArrowRight size={25} />
          </Link>
        </div>
        <div className={style.firstNotice}>
          <div className={style.firstNoticeImg}>
            <img src={filteredPublications[0]?.image} alt={filteredPublications[0]?.id} />
          </div>
          <div className={style.firstNoticeText}>
            <div className={style.firstNoticeTextTop}>
              <small>{filteredPublications[0]?.date}</small>
              <Link to={`/detail/${filteredPublications[0]?.id}`} className={style.link}>
                <h3>{filteredPublications[0]?.title}</h3>
              </Link>
              <p>{filteredPublications[0]?.description}</p>
            </div>
            <Link to={`/noticia/${filteredPublications[0]?.id}`} className={style.link}>
              <label>LEER MÁS</label>
            </Link>
          </div>
        </div>
        <div className={style.publications}>
          {filteredPublications?.map((publication, index) => <Publication key={index} publication={publication} isDetailPage={false} />)}
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
            <div className={style.cardEvents}>
              {events?.map((event, index) => 
                <Link to={`/noticia/${event?.id}`} key={index} className={style.eventCard}>
                  <small>{format(event.date, "PP")}</small>
                  <h3>{event.title}</h3>
                  <img src={event.image} alt={event.title} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className={style.tourism}>
        <div className={style.titlePublications}>
          <h2>
            Alojamientos<br></br>
            <span>En La Pedania</span>
          </h2>
          <Link to="/alojamientos" >
            Más alojamientos<FaArrowRight size={25} />
          </Link>
        </div>
        <div className={style.publications}>
          {filteredComplexes?.map((complex, index) => <Publication key={index} complex={complex} isDetailPage={false} />)}
        </div>
      </section>
    </main>
  );
}
