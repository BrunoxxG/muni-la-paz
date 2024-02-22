import { useState } from "react";
import { format, setDefaultOptions } from "date-fns";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
setDefaultOptions({ locale: es });
import Swal from "sweetalert2";
import style from "./PublicationForm.module.css";
import "react-day-picker/dist/style.css";
import axios from "axios";
import { getPublications } from "../../../redux/actions";
import { URL_BASE } from "../../../utils/const";
import { useDispatch } from "react-redux";

export default function PublicationForm({ publication, authUser }) {
  const dispatch = useDispatch();

  const allTypes = ["General", "Eventos", "Salud", "Institucional", "Deportes", "Concejo", "Servicios"];
  const [input, setInput] = useState({
    title: publication?.title || "",
    description: publication?.description || "",
    images: [],
    imagesPreviews: [],
    type: publication?.type || "General",
    date: publication?.date ? new Date(publication.date) : new Date(),
  });

  let footer;
  if (input.date) {
    footer = (
      <p>
        Fecha seleccionada: <b>{format(input.date, "P")}</b>.
      </p>
    );
  }

  const handleChange = (e) => {
    setInput((prevInput) => {
      if (e instanceof Date) {
        return {
          ...prevInput,
          date: e,
        };
      } else if (e.target.type === "file") {
        const selectedFiles = Array.from(e.target.files);
        return {
          ...prevInput,
          images: selectedFiles,
          imagesPreviews: selectedFiles.map((file) => URL.createObjectURL(file)),
        };
      } else {
        return {
          ...prevInput,
          [e.target.name]: e.target.value,
        };
      }
    });
  };

  const removePhoto = (indexImage) => {
    setInput((prevInput) => {
      const updatedImages = prevInput.images.filter((_, index) => index !== indexImage);
      const updatedPreviews = prevInput.imagesPreviews.filter((_, index) => index !== indexImage);

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

      return {
        ...prevInput,
        images: updatedImages,
        imagesPreviews: updatedPreviews,
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
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("type", input.type);
        formData.append("date", input.date.toISOString());

        input.images.forEach((image) => {
          formData.append(`images`, image);
        });
        try {
          const response = await axios.post(`${URL_BASE}/publications`, formData, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            dispatch(getPublications());
            setInput({
              title: "",
              description: "",
              images: [],
              type: "General",
              date: new Date(),
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
        try {
          const response = await axios.patch(`${URL_BASE}/publications/${publication.id}`, input, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            dispatch(getPublications());
            setInput({
              title: "",
              description: "",
              image: "prueba",
              type: "General",
              date: new Date(),
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
        }
      }
    });
  };

  return (
    <div>
      {publication ? (
        <div>
          <h1>FORM EDIT PUBLICATION</h1>
          <form onSubmit={handleEdit} className={style.form} encType="multipart/form-data">
            <div className=" w-2/5">
              <label className="block mb-2 text-m font-medium text-gray-900 ">Titulo</label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Your product name"
              />
              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>
            <div className=" w-2/5">
              <label className="block mb-2 text-m font-medium text-gray-900 ">Descripción</label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Your product name"
              />
              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>
            <div className=" w-2/5">
              <label className="block mb-2 text-m font-medium text-gray-900 ">Tipo</label>
              <select
                className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                name="type"
                value={input.type}
                onChange={handleChange}
              >
                {allTypes?.map((type, index) => {
                  return <option key={index}>{type}</option>;
                })}
              </select>
              {/* {errors.category && <p className=" text-red-600 text-sm font-semibold ">{errors.category}</p>} */}
            </div>
            {input.type === "Eventos" && (
              <div className=" w-2/5">
                <DayPicker
                  mode="single"
                  locale={es}
                  onDayClick={handleChange}
                  defaultMonth={input.date}
                  selected={input.date}
                  footer={footer}
                />
                {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
              </div>
            )}
            <div className=" w-2/5">
              <label className="block mb-2 text-m font-medium text-gray-900 ">Descripción</label>
              <input
                type="file"
                name="images"
                multiple
                value={input.images}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Your product name"
              />
              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>
            <button>EDITAR</button>
          </form>
        </div>
      ) : (
        <div className={style.content}>
          <h2>Crear Publicación</h2>
          <form onSubmit={handleCreate} className={style.form} encType="multipart/form-data">
            <div className={style.divInput}>
              <label>
                Titulo{" "}
                <input type="text" name="title" value={input.title} onChange={handleChange} placeholder="Titulo" className={style.inputText} />
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
                Tipo{" "}
                <select name="type" value={input.type} onChange={handleChange}>
                  {allTypes?.map((type, index) => {
                    return <option key={index}>{type}</option>;
                  })}
                </select>
              </label>
            </div>
            {input.type === "Eventos" && (
              <div className={style.divInput}>
                {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}

                <DayPicker
                  mode="single"
                  locale={es}
                  onDayClick={handleChange}
                  defaultMonth={input.date}
                  selected={input.date}
                  footer={footer}
                  className={style.dayPicker}
                />
              </div>
            )}

            <div className={style.divInput}>
              <label>
                Imágenes
                <input type="file" multiple className="hidden" onChange={handleChange} />
              </label>
              {input.imagesPreviews &&
                input.imagesPreviews.map((link, index) => (
                  <div key={index}>
                    <img src={link} alt="" />
                    <button type="button" onClick={() => removePhoto(index)}>
                      eliminar
                    </button>
                    {index !== 0 && (
                      <button type="button" onClick={() => selectAsMainPhoto(index)}>
                        hacer principal
                      </button>
                    )}
                  </div>
                ))}
            </div>

            <button type="submit">CREAR</button>
          </form>
        </div>
      )}
    </div>
  );
}
