import { useState } from "react";
import { format, setDefaultOptions } from "date-fns";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
setDefaultOptions({ locale: es });
import Swal from "sweetalert2";
import style from "./DocumentForm.module.css";
import "react-day-picker/dist/style.css";
import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;
import { FaUpload } from "react-icons/fa";
import imageCompression from "browser-image-compression";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

export default function DocumentForm({ document, authUser }) {
  const [input, setInput] = useState({
    title: document?.title || "",
    description: document?.description || "",
    pdf: "",
    pdfPreview: document?.pdf ? `${VITE_BACKEND_URL}${document.pdf}` : "",
    type: "Documento PDF",
    date: document?.date ? new Date(document.date) : new Date(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setInput((prevInput) => {
      if (e && e.name && e.value !== undefined) {
        return {
          ...prevInput,
          [e.name]: e.value,
        };
      }

      if (e.target.type === "file") {
        const file = e.target.files[0];

        return {
          ...prevInput,
          pdf: file,
          pdfPreview: file ? URL.createObjectURL(file) : "",
        };
      }

      return {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirmación",
      text: `Confirma CREAR`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      setIsSubmitting(true);
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("type", input.type);
        formData.append("date", input.date.toISOString());
        formData.append("pdf", input.pdf);

        try {
          const response = await axios.post(`${VITE_BACKEND_URL}/documents`, formData, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            setInput({
              title: "",
              description: "",
              pdf: "",
              pdfPreview: "",
              type: "Documento PDF",
              date: new Date(),
            });
            Swal.fire({
              title: "Creado",
              text: "Se creo correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
            });
            window.location.reload();
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: `${error.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 2500,
          });
          console.log(error);
          setIsSubmitting(false);
        }
      }
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirmación",
      text: `Confirma EDITAR`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("type", input.type);
        formData.append("date", input.date.toISOString());
        formData.append("check", false);
        if (input.pdf) {
          formData.append("pdf", input.pdf);
        }

        try {
          const response = await axios.patch(`${VITE_BACKEND_URL}/documents/${document.id}`, formData, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            setInput({
              title: "",
              description: "",
              pdf: "",
              pdfPreview: "",
              type: "Documento PDF",
              date: new Date(),
            });
            Swal.fire({
              title: "Actulaizado",
              text: "Se actualizo correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2500,
            });
            window.location.reload();
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: `${error.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 2500,
          });
          setIsSubmitting(false);
        }
      }
    });
  };

  return (
    <div>
      {document ? (
        <div className={style.content}>
          <h1>Editar Documento PDF</h1>
          <form onSubmit={handleEdit} className={style.form} encType="multipart/form-data">
            <div className={style.divInput}>
              <label>
                Titulo{" "}
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={handleChange}
                  placeholder="Titulo"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>
            <div className={style.divInput}>
              <label>
                Descripción{" "}
                <textarea
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  placeholder="Descripción"
                  className={style.inputDescription}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Click para subir Archivo PDF
                <input type="file" name="pdf" accept="application/pdf" single className={style.inputFile} onChange={handleChange} />
                <FaUpload className={style.icon} />
              </label>
              {input.pdfPreview && (
                <div className={style.divPdf}>
                  <Document file={input.pdfPreview} className={style.pdf}>
                    <Page pageNumber={1} width={280} renderTextLayer={false} renderAnnotationLayer={false} />
                    <div className={style.buttonsImage}>
                      <button type="button" className={style.btnDelete} onClick={() => removePhoto(index, "pdf")}>
                        eliminar
                      </button>
                    </div>
                  </Document>
                </div>
              )}
            </div>

            <button type="submit" disabled={isSubmitting} className={style.btn}>
              {isSubmitting ? "CARGANDO..." : "EDITAR"}
            </button>
          </form>
        </div>
      ) : (
        <div className={style.content}>
          <h2>Crear Documento PDF</h2>
          <form onSubmit={handleCreate} className={style.form} encType="multipart/form-data">
            <div className={style.divInput}>
              <label>
                Titulo{" "}
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={handleChange}
                  placeholder="Titulo"
                  className={style.inputText}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>
            <div className={style.divInput}>
              <label>
                Descripción{" "}
                <textarea
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  placeholder="Descripción"
                  className={style.inputDescription}
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              <label>
                Click para subir Archivo PDF
                <input
                  type="file"
                  name="pdf"
                  accept="application/pdf"
                  className={style.inputFile}
                  onChange={handleChange}
                />
                <FaUpload className={style.icon} />
              </label>
              {input.pdfPreview && <div className={style.gridImages}></div>}
            </div>

            <button type="submit" disabled={isSubmitting} className={style.btn}>
              {isSubmitting ? "CARGANDO..." : "CREAR"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
