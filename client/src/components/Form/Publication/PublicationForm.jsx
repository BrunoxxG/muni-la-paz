import { useState } from "react";
import { format, setDefaultOptions } from "date-fns";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
setDefaultOptions({ locale: es });
import Swal from "sweetalert2";
import style from "./PublicationForm.module.css";
import "react-day-picker/dist/style.css";
import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;
import { FaUpload } from "react-icons/fa";
import imageCompression from "browser-image-compression";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

export default function PublicationForm({ publication, authUser }) {
  const allTypes = [
    "General",
    "Evento",
    "Salud",
    "Institucional",
    "Deporte",
    "Concejo",
    "Servicio",
    "Turismo",
    "Cultura",
  ];
  const [input, setInput] = useState({
    title: publication?.title || "",
    description: publication?.description || "",
    images: [],
    imagesPreviews: [],
    type: publication?.type || "General",
    isEvent: publication?.isEvent || false,
    date: publication?.date ? new Date(publication.date) : new Date(),
    eventDate: publication?.eventDate ? new Date(publication.eventDate) : new Date(),
    video: publication?.video || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  let footer;
  if (input.eventDate) {
    footer = (
      <p>
        Fecha seleccionada: <b>{format(input.eventDate, "P")}</b>.
      </p>
    );
  }

  const handleChange = (e) => {
    setInput((prevInput) => {
      if (e instanceof Date) {
        return {
          ...prevInput,
          eventDate: e,
        };
      } else if (e.target.type === "file") {
        const selectedFiles = Array.from(e.target.files);
        let filesWithTypes = selectedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          type: file.type,
        }));

        if (prevInput.type === "Concejo") {
          filesWithTypes.sort((a, b) => (a.type === "application/pdf" ? -1 : 1));
        }

        return {
          ...prevInput,
          images: filesWithTypes.map((fileObj) => fileObj.file),
          imagesPreviews: filesWithTypes.map((fileObj) => fileObj.preview),
          fileTypes: filesWithTypes.map((fileObj) => fileObj.type),
        };
      } else if (e.target.name === "isEvent") {
        return {
          ...prevInput,
          isEvent: e.target.checked,
        };
      } else {
        return {
          ...prevInput,
          [e.target.name]: e.target.value,
        };
      }
    });
  };

  const removePhoto = (indexImage, file) => {
    setInput((prevInput) => {
      const updatedImages = prevInput.images.filter((_, index) => index !== indexImage);
      const updatedPreviews = prevInput.imagesPreviews.filter((_, index) => index !== indexImage);

      Swal.fire({
        title: `Borrar ${file}`,
        text: `Se borro ${file} correctamente`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      return {
        ...prevInput,
        images: updatedImages,
        imagesPreviews: updatedPreviews,
      };
    });
  };

  const selectAsMainPhoto = (indexImage) => {
    setInput((prevInput) => {
      const updatedImages = [
        prevInput.images[indexImage],
        ...prevInput.images.slice(0, indexImage),
        ...prevInput.images.slice(indexImage + 1),
      ];

      const updatedPreviews = [
        prevInput.imagesPreviews[indexImage],
        ...prevInput.imagesPreviews.slice(0, indexImage),
        ...prevInput.imagesPreviews.slice(indexImage + 1),
      ];

      Swal.fire({
        title: "Selección imagen principal",
        text: "Se selecciono correctamente",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      return {
        ...prevInput,
        images: updatedImages,
        imagesPreviews: updatedPreviews,
      };
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    Swal.fire({
      title: "Confirmación",
      text: `Confirma CREAR`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("type", input.type);
        formData.append("isEvent", input.isEvent);
        formData.append("date", input.date.toISOString());
        formData.append("eventDate", input.eventDate.toISOString());
        formData.append("video", input.video);

        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: "image/webp",
          initialQuality: 0.7,
        };

        for (const image of input.images) {
          const compressedFile = await imageCompression(image, options);
          formData.append("images", compressedFile, compressedFile.name.replace(/\.\w+$/, ".webp"));
        }

        try {
          const response = await axios.post(`${VITE_BACKEND_URL}/publications`, formData, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            setInput({
              title: "",
              description: "",
              images: [],
              imagesPreviews: [],
              type: "General",
              isEvent: false,
              date: new Date(),
              eventDate: new Date(),
              video: "",
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
          setIsSubmitting(false);
        }
      }
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    Swal.fire({
      title: "Confirmación",
      text: `Confirma EDITAR`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("type", input.type);
        formData.append("isEvent", input.isEvent);
        formData.append("date", input.date.toISOString());
        formData.append("eventDate", input.eventDate.toISOString());
        formData.append("check", false);
        formData.append("video", input.video);

        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: "image/webp",
          initialQuality: 0.7,
        };

        for (const image of input.images) {
          const compressedFile = await imageCompression(image, options);
          formData.append("images", compressedFile, compressedFile.name.replace(/\.\w+$/, ".webp"));
        }

        try {
          const response = await axios.patch(`${VITE_BACKEND_URL}/publications/${publication.id}`, formData, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            setInput({
              title: "",
              description: "",
              images: [],
              imagesPreviews: [],
              type: "General",
              isEvent: false,
              date: new Date(),
              eventDate: new Date(),
              video: "",
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
      {publication ? (
        <div className={style.content}>
          <h1>Editar Publicación</h1>
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
                Elegir el tipo de publicación
                <select name="type" value={input.type} onChange={handleChange}>
                  {allTypes?.map((type, index) => {
                    return <option key={index}>{type}</option>;
                  })}
                </select>
              </label>
            </div>

            <div className={style.divInput}>
              <label className={style.isEventLabel}>
                Marcar si es un Evento
                <input
                  type="checkbox"
                  name="isEvent"
                  checked={input.isEvent}
                  className={style.inputCheckbox}
                  onChange={handleChange}
                />
              </label>
            </div>

            {input.isEvent && (
              <div className={style.divInput}>
                {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
                <label>Seleccione fecha del evento</label>
                <DayPicker
                  mode="single"
                  locale={es}
                  onDayClick={handleChange}
                  defaultMonth={input.eventDate}
                  selected={input.eventDate}
                  footer={footer}
                  className={style.dayPicker}
                  fromDate={new Date()}
                />
              </div>
            )}

            <div className={style.divInput}>
              <label>
                Video{" "}
                <input
                  type="text"
                  name="video"
                  value={input.video}
                  onChange={handleChange}
                  placeholder="Video"
                  className={style.inputText}
                />
              </label>

              {input.video && (
                <div className={style.video}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={input.video.replace("watch?v=", "embed/")}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              )}

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              {input.type === "Concejo" ? (
                <>
                  <label>
                    Click para subir Archivo PDF e Imágenes
                    <input type="file" multiple className={style.inputFile} onChange={handleChange} />
                    <FaUpload className={style.icon} />
                  </label>
                  {input.imagesPreviews && (
                    <div className={style.gridImages}>
                      {input.imagesPreviews.map((link, index) => {
                        const fileType = input.fileTypes[index];
                        const isPdf = fileType === "application/pdf";
                        return (
                          <div key={index}>
                            {isPdf ? (
                              <div className={style.divPdf}>
                                <Document file={link} className={style.pdf}>
                                  <Page
                                    pageNumber={1}
                                    width={280}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                  />
                                  <div className={style.buttonsImage}>
                                    <button
                                      type="button"
                                      className={style.btnDelete}
                                      onClick={() => removePhoto(index, "pdf")}
                                    >
                                      eliminar
                                    </button>
                                  </div>
                                </Document>
                              </div>
                            ) : (
                              <div className={style.divImage}>
                                <img src={link} alt={`imagen ${index}`} />
                                <div className={style.buttonsImage}>
                                  <button
                                    type="button"
                                    className={style.btnDelete}
                                    onClick={() => removePhoto(index, "imagen")}
                                  >
                                    eliminar
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <label>
                    Imágenes
                    <input type="file" multiple className={style.inputFile} onChange={handleChange} />
                    <FaUpload className={style.icon} />
                  </label>
                  {input.imagesPreviews && (
                    <div className={style.gridImages}>
                      {input.imagesPreviews.map((link, index) => (
                        <div key={index} className={style.divImage}>
                          <img src={link} alt={`imagen ${index}`} />
                          <div className={style.buttonsImage}>
                            <button
                              type="button"
                              className={style.btnDelete}
                              onClick={() => removePhoto(index, "imagen")}
                            >
                              eliminar
                            </button>
                            {index !== 0 && (
                              <button type="button" className={style.btn} onClick={() => selectAsMainPhoto(index)}>
                                hacer principal
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            <button type="submit" disabled={isSubmitting} className={style.btn}>
              {isSubmitting ? "CARGANDO..." : "EDITAR"}
            </button>
          </form>
        </div>
      ) : (
        <div className={style.content}>
          <h2>Crear Publicación</h2>
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
                Elegir el tipo de publicación
                <select name="type" value={input.type} onChange={handleChange}>
                  {allTypes?.map((type, index) => {
                    return <option key={index}>{type}</option>;
                  })}
                </select>
              </label>
            </div>

            <div className={style.divInput}>
              <label className={style.isEventLabel}>
                Marcar si es un Evento
                <input
                  type="checkbox"
                  name="isEvent"
                  checked={input.isEvent}
                  className={style.inputCheckbox}
                  onChange={handleChange}
                />
              </label>
            </div>

            {input.isEvent && (
              <div className={style.divInput}>
                {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
                <label>Seleccione fecha del evento</label>
                <DayPicker
                  mode="single"
                  locale={es}
                  onDayClick={handleChange}
                  defaultMonth={input.eventDate}
                  selected={input.eventDate}
                  footer={footer}
                  className={style.dayPicker}
                  fromDate={new Date()}
                />
              </div>
            )}

            <div className={style.divInput}>
              <label>
                Video{" "}
                <input
                  type="text"
                  name="video"
                  value={input.video}
                  onChange={handleChange}
                  placeholder="Video"
                  className={style.inputText}
                />
              </label>

              {input.video && input.video.includes("youtube.com/watch?v=") && (
                <div className={style.video}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={input.video.replace("watch?v=", "embed/")}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              )}

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>

            <div className={style.divInput}>
              {input.type === "Concejo" ? (
                <>
                  <label>
                    Click para subir Archivo PDF e Imágenes
                    <input type="file" multiple className={style.inputFile} onChange={handleChange} />
                    <FaUpload className={style.icon} />
                  </label>
                  {input.imagesPreviews && (
                    <div className={style.gridImages}>
                      {input.imagesPreviews.map((link, index) => {
                        const fileType = input.fileTypes[index];
                        const isPdf = fileType === "application/pdf";
                        return (
                          <div key={index}>
                            {isPdf ? (
                              <div className={style.divPdf}>
                                <Document file={link} className={style.pdf}>
                                  <Page
                                    pageNumber={1}
                                    width={280}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                  />
                                  <div className={style.buttonsImage}>
                                    <button
                                      type="button"
                                      className={style.btnDelete}
                                      onClick={() => removePhoto(index, "pdf")}
                                    >
                                      eliminar
                                    </button>
                                  </div>
                                </Document>
                              </div>
                            ) : (
                              <div className={style.divImage}>
                                <img src={link} alt={`imagen ${index}`} />
                                <div className={style.buttonsImage}>
                                  <button
                                    type="button"
                                    className={style.btnDelete}
                                    onClick={() => removePhoto(index, "imagen")}
                                  >
                                    eliminar
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <label>
                    Click para subir Imágenes
                    <input type="file" multiple className={style.inputFile} onChange={handleChange} />
                    <FaUpload className={style.icon} />
                  </label>
                  {input.imagesPreviews && (
                    <div className={style.gridImages}>
                      {input.imagesPreviews.map((link, index) => (
                        <div key={index} className={style.divImage}>
                          <img src={link} alt={`imagen ${index}`} />
                          <div className={style.buttonsImage}>
                            <button
                              type="button"
                              className={style.btnDelete}
                              onClick={() => removePhoto(index, "imagen")}
                            >
                              eliminar
                            </button>
                            {index !== 0 && (
                              <button type="button" className={style.btn} onClick={() => selectAsMainPhoto(index)}>
                                hacer principal
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
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
