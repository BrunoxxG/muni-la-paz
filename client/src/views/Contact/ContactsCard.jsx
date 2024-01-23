import React from "react";
import style from "./Contacts.module.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const ContactCard = ({ title, phone, whatsapp, email }) => {
  return (
    <div className={style.card}>
      <h1 className={style.title}>{title}</h1>
      <h2 className={style.subtitle}>
        <BsFillTelephoneFill /> {phone}
      </h2>
      {whatsapp && <h2 className={style.subtitle}><FaWhatsapp /> {whatsapp}</h2>}
      {email && <h2 className={style.subtitle}><AiOutlineMail /> <a href={`mailto:${email}`}>{email}</a></h2>}
    </div>
  );
};

export default ContactCard;
