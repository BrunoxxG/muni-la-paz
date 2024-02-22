import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import useComplex from "../../../hooks/useComplex";
import style from "./ComplexDetail.module.css";
import { useLocation } from "react-router-dom";

const image = "/src/assets/images/complejo.jpg";
const image1 = "/src/assets/images/complejo1.jpg";
const image2 = "/src/assets/images/complejo2.jpg";
const image4 = "/src/assets/images/complejo4.jpg";

const ComplexDetail = () => {
  const complex = useComplex();
  const navigate = useLocation();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [images] = useState([image, image1, image2, image4]);

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
    const currentIndex = images.indexOf(selectedImage);
    let newIndex;
    if (direction === "left") {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedImage(images[newIndex]);
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
          {complex?.image[0] && (
            <div className={style.imagesContainer}>
              <img
                onClick={() => handleImageClick(image)}
                src={image}
                alt={complex.name}
              />
              <div className={style.imgDiv}>
                {images.map(
                  (image, index) =>
                    index !== 0 && (
                      <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        onClick={() => handleImageClick(image)}
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
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Popup"
                className={style.popupImage}
              />
            )}
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
