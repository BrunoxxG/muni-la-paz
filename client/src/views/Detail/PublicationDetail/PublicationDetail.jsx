import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { format as dateformat } from "date-fns";
import usePublication from "../../../hooks/usePublication";
import style from "./PublicationDetail.module.css";
import { URL_BASE } from "../../../utils/const";

export default function PublicationDetail() {
  const publication = usePublication();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleArrowClick = (direction) => {
    const currentIndex = publication.images.indexOf(selectedImage.replace(URL_BASE, ""));
    let newIndex;
    if (direction === "left") {
      newIndex = currentIndex === 0 ? publication.images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === publication.images.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedImage(URL_BASE + publication.images[newIndex]);
  };

  return (
    <div className={style.container}>
      <button onClick={handleBack}>
        <FaCircleArrowLeft size={30} />
      </button>
      <div>
        <h1>{publication?.title}</h1>

        {/* se renderiza si hay imagenes */}
        <div className={style.images}>
          {publication?.images && publication.images.length > 0 && (
            <div className={style.imagesContainer}>
              <img
                onClick={() => handleImageClick(URL_BASE + publication.images[0])}
                src={URL_BASE + publication.images[0]}
                alt={publication.title}
              />
              <div className={style.imgDiv}>
                {publication.images.map(
                  (image, index) =>
                    index !== 0 && (
                      <img
                        key={index}
                        src={URL_BASE + image}
                        alt={`Image ${index + 1}`}
                        onClick={() => handleImageClick(URL_BASE + image)}
                      />
                    )
                )}
              </div>
            </div>
          )}
        </div>
        <p>Descripcion: {publication?.description}</p>
        <span>Fecha: {publication ? dateformat(publication.date, "PP") : "Sin fecha"}</span>
        <p> {publication?.type}</p>
      </div>
      {showPopup && (
        <div className={style.popup}>
          <div className={style.popupImageContainer}>
            <button
              className={`${style.carouselControl} ${style.carouselControlLeft}`}
              onClick={() => handleArrowClick("left")}
            >
              <FaArrowCircleLeft />
            </button>
            {selectedImage && <img src={selectedImage} alt="Popup" className={style.popupImage} />}
            <button
              className={`${style.carouselControl} ${style.carouselControlRight}`}
              onClick={() => handleArrowClick("right")}
            >
              <FaArrowCircleRight />
            </button>
            <button className={style.closeButton} onClick={handlePopupClose}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
