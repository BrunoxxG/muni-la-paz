import { useState } from "react";
import Swal from "sweetalert2";
import style from "./CarrouselForm.module.css";
import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;
import { FaUpload } from "react-icons/fa";

export default function CarrouselForm({ carrousel, authUser }) {
  const [input, setInput] = useState({
    images: [],
    imagesPreviews: [],
    carrouselPreviews: carrousel,
  });

  const handleChange = (e) => {
    setInput((prevInput) => {
      if (e.target.type === "file") {
        const selectedFiles = Array.from(e.target.files);
        let filesWithTypes = selectedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          type: file.type,
        }));

        return {
          ...prevInput,
          images: filesWithTypes.map((fileObj) => fileObj.file),
          imagesPreviews: filesWithTypes.map((fileObj) => fileObj.preview),
          fileTypes: filesWithTypes.map((fileObj) => fileObj.type),
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

  const removePhotoCarrousel = (indexImage, file) => {
    setInput((prevInput) => {
      const updatedPreviews = prevInput.carrouselPreviews.filter((_, index) => index !== indexImage);

      Swal.fire({
        title: `Borrar ${file}`,
        text: `Se borro ${file} correctamente`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      return {
        ...prevInput,
        carrouselPreviews: updatedPreviews,
      };
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirmación",
      text: `Confirma GUARDAR`,
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        input.carrouselPreviews.forEach((image) => {
          formData.append(`carrouselPreviews`, image);
        });

        if (input.images.length) {
          input.images.forEach((image) => {
            formData.append(`images`, image);
          });
        }
        try {
          const response = await axios.patch(`${VITE_BACKEND_URL}/carrousel`, formData, {
            headers: { Authorization: authUser.token },
          });
          if (response.status === 200) {
            setInput({
              images: [],
              imagesPreviews: [],
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
        }
      }
    });
  };

  return (
    <div className={style.content}>
      <form onSubmit={handleEdit} className={style.form} encType="multipart/form-data">
        <h1>Editar Carrousel</h1>
        <div className={style.divInput}>
          {carrousel && (
            <div className={style.gridImages}>
              {input.carrouselPreviews.map((link, index) => (
                <div key={index} className={style.divImage}>
                  <img src={VITE_BACKEND_URL + link} alt={`imagen ${index}`} />
                  <div className={style.buttonsImage}>
                    <button type="button" className={style.btnDelete} onClick={() => removePhotoCarrousel(index, "imagen")}>
                      eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={style.divInput}>
          <label>
            Subir Imágenes
            <input type="file" multiple className={style.inputFile} onChange={handleChange} />
            <FaUpload className={style.icon} />
          </label>
          {input.imagesPreviews && (
            <div className={style.gridImages}>
              {input.imagesPreviews.map((link, index) => (
                <div key={index} className={style.divImage}>
                  <img src={link} alt={`imagen ${index}`} />
                  <div className={style.buttonsImage}>
                    <button type="button" className={style.btnDelete} onClick={() => removePhoto(index, "imagen")}>
                      eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className={style.btn}>
          GUARDAR
        </button>
      </form>
    </div>
  );
}
