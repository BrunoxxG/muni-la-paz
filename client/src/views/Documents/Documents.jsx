import style from "./Documents.module.css";
import { Link } from "react-router-dom";
import { DocumentPDF } from "../../components";

export default function Documents({ documents }) {
  return (
    <div className={style.container}>
      <nav className={style.navTitles}>
        <Link to="/">Home</Link>
        <span>Documentos PDF</span>
      </nav>

      <div className={style.title}>
        <h2>
          Documentos PDF<br></br>
          <span>Últimas entradas</span>
        </h2>
      </div>
      <div className={style.grid}>
        {documents?.map((document, index) => (
          <DocumentPDF key={index} document={document} />
        ))}
      </div>
    </div>
  );
}
