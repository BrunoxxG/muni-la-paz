import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;
import { MdEdit, MdDelete, MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import style from "./Document.module.css";
import { useDispatch } from "react-redux";
import { getDocuments } from "../../../redux/actions";
import { format, setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";
setDefaultOptions({ locale: es });

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

export default function DocumentPDF({ document, authUser, handleForm }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleDelete = async () => {
    Swal.fire({
      title: "Confirmación",
      text: `Confirma ELIMINAR`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${VITE_BACKEND_URL}/documents/${document.id}`, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            dispatch(getDocuments());
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleCheck = async (value) => {
    const textAlert = value ? "HABILITAR" : "DESHABILITAR";
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
        try {
          const response = await axios.patch(`${VITE_BACKEND_URL}/documents/${document.id}`, updateCheck, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            dispatch(getDocuments());
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const openPdf = (pdf) => {
    window.open(pdf, "_blank");
  };

  return (
    <div className={style.card}>
      <div className={style.data}>
        <div className={style.pdfContainer}>
          <Document file={VITE_BACKEND_URL + document.pdf}>
            <Page pageNumber={1} width={225} renderTextLayer={false} renderAnnotationLayer={false} />
          </Document>
        </div>

        <div className={style.cardText}>
          <h3>{document.title}</h3>
          <p>{document.description}</p>
        </div>
        <div className={style.cardFooter}>
          <button onClick={() => openPdf(VITE_BACKEND_URL + document.pdf)}>Ver PDF</button>
        </div>
      </div>

      {authUser && (
        <div className={style.buttons}>
          <button
            className={`${style.btn} ${style.edit}`}
            name="document"
            onClick={(event) => handleForm(event, document)}
          >
            <MdEdit />
          </button>

          {authUser.rol && (
            <div className={style.buttonsAdmin}>
              <button className={`${style.btn} ${style.delete}`} onClick={() => handleDelete()}>
                <MdDelete />
              </button>
              {document.check === false ? (
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
      )}
    </div>
  );
}
