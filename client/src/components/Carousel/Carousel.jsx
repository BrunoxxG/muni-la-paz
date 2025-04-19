import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
const { VITE_BACKEND_URL } = import.meta.env;

import style from "./Carousel.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function Carousel({ carrousel }) {
  if (!carrousel || carrousel.length === 0) {
    return <img src="img/carrousel/default-img.png" alt="default img" className={style.slideImg} />;
  }

  return (
    <Swiper
      modules={[Navigation, A11y, Autoplay]}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 4000,
      }}
    >
      {carrousel.map((path, index) => (
        <SwiperSlide key={index}>
          <img src={VITE_BACKEND_URL + path} alt={`Slide${index}`} className={style.slideImg} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
