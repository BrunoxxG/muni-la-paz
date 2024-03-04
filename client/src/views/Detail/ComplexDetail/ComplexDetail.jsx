import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import useComplex from "../../../hooks/useComplex";
import style from "./ComplexDetail.module.css";
import { useLocation } from "react-router-dom";
const { VITE_BACKEND_URL } = import.meta.env;

const ComplexDetail = () => {
  const complex = useComplex();
  const navigate = useLocation();

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
    const currentIndex = complex.images.indexOf(selectedImage.replace(VITE_BACKEND_URL, ""));
    let newIndex;
    if (direction === "left") {
      newIndex = currentIndex === 0 ? complex.images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === complex.images.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedImage(VITE_BACKEND_URL + complex.images[newIndex]);
  };

  return (
    <div className={style.container}>
      <button onClick={handleBack}>
        <FaArrowCircleLeft size={30} />
      </button>
      <div>
        <h1>{complex?.name}</h1>

        {/* se renderiza si hay imagenes */}
        <div className={style.images}>
          {complex?.images && complex.images.length > 0 && (
            <div className={style.imagesContainer}>
              <img onClick={() => handleImageClick(image)} src={VITE_BACKEND_URL + complex.images[0]} alt={complex.name} />
              <div className={style.imgDiv}>
                {complex.images.map(
                  (image, index) =>
                    index !== 0 && (
                      <img
                        key={index}
                        src={VITE_BACKEND_URL + image}
                        alt={`Image ${index + 1}`}
                        onClick={() => handleImageClick(VITE_BACKEND_URL + image)}
                      />
                    )
                )}
              </div>
            </div>
          )}
        </div>
        <p>Descripcion: {complex?.description}</p>
        <span>Direccion: {complex?.address}</span>
        <p>Contacto: {complex?.contact}</p>
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
};

export default ComplexDetail;
