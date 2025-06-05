import { useState } from "react";
import Swal from "sweetalert2";
import style from "./CarrouselForm.module.css";
import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;
import { FaUpload } from "react-icons/fa";
import imageCompression from "browser-image-compression";

export default function CarrouselForm({ carrousel, authUser }) {
  const [input, setInput] = useState({
    images: [],
    carrouselPreviews: carrousel ? [...carrousel] : [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const swapImages = (index1, index2) => {
    if (
      index1 < 0 ||
      index2 < 0 ||
      index1 >= input.carrouselPreviews.length ||
      index2 >= input.carrouselPreviews.length
    )
      return;

    setInput((prev) => {
      const newPreviews = [...prev.carrouselPreviews];
      [newPreviews[index1], newPreviews[index2]] = [newPreviews[index2], newPreviews[index1]];
      return {
        ...prev,
        carrouselPreviews: newPreviews.map((img, i) => ({ ...img, order: i + 1 })),
      };
    });
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const files = Array.from(e.target.files);
      const newPreviews = files.map((file, i) => ({
        path: URL.createObjectURL(file),
        order: input.carrouselPreviews.length + i + 1,
        isNew: true,
        file,
      }));

      setInput((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
        carrouselPreviews: [...prev.carrouselPreviews, ...newPreviews],
      }));
    }
  };

  const removePhoto = (index) => {
    setInput((prev) => {
      const removed = prev.carrouselPreviews[index];
      const updatedPreviews = prev.carrouselPreviews.filter((_, i) => i !== index);

      let updatedImages = prev.images;
      if (removed.isNew) {
        updatedImages = prev.images.filter((imgFile) => imgFile !== removed.file);
      }

      return {
        ...prev,
        carrouselPreviews: updatedPreviews.map((img, i) => ({
          ...img,
          order: i + 1,
        })),
        images: updatedImages,
      };
    });

    Swal.fire({
      title: "Imagen eliminada",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await Swal.fire({
      title: "Confirmación",
      text: "Confirma GUARDAR",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();

    formData.append(
      "carrouselPreviews",
      JSON.stringify(
        input.carrouselPreviews.map((img) => ({
          path: img.isNew ? img.file.name.replace(/\.\w+$/, ".webp") : img.path,
          order: img.order,
        }))
      )
    );

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: "image/webp",
      initialQuality: 0.7,
    };

    try {
      for (const image of input.images) {
        const compressed = await imageCompression(image, options);
        formData.append("images", compressed, compressed.name.replace(/\.\w+$/, ".webp"));
      }

      const response = await axios.patch(`${VITE_BACKEND_URL}/carrousel`, formData, {
        headers: { Authorization: authUser.token },
      });

      if (response.status === 200) {
        setInput({
          images: [],
          carrouselPreviews: [],
        });

        Swal.fire({
          title: "Actualizado",
          text: "Se actualizó correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        });

        window.location.reload();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className={style.content}>
      <form onSubmit={handleEdit} className={style.form} encType="multipart/form-data">
        <h1>Editar Carrousel</h1>

        {input.carrouselPreviews.length > 0 && (
          <div className={style.divInput}>
            <div className={style.gridImages}>
              {input.carrouselPreviews.map((img, index) => (
                <div key={index} className={style.divImage}>
                  <img
                    src={img.isNew ? img.path : VITE_BACKEND_URL + "/public/images/carrousel/" + img.path}
                    alt={`imagen ${index}`}
                  />
                  <div className={style.buttonsImage}>
                    <button
                      type="button"
                      className={style.btnMove}
                      disabled={index === 0}
                      onClick={() => swapImages(index, index - 1)}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className={style.btnMove}
                      disabled={index === input.carrouselPreviews.length - 1}
                      onClick={() => swapImages(index, index + 1)}
                    >
                      →
                    </button>
                    <button type="button" className={style.btnDelete} onClick={() => removePhoto(index)}>
                      eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={style.divInput}>
          <label>
            Subir Imágenes
            <input type="file" multiple className={style.inputFile} onChange={handleChange} />
            <FaUpload className={style.icon} />
          </label>
        </div>

        <button type="submit" disabled={isSubmitting} className={style.btn}>
          {isSubmitting ? "CARGANDO..." : "GUARDAR"}
        </button>
      </form>
    </div>
  );
}
