import React from "react";
import style from "./Contact.module.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const ContactCard = ({ contact }) => {
  const { title, phone, whatsapp, email } = contact;
  return (
    <div className={style.card}>
      <h1 className={style.title}>{title}</h1>
      <h2 className={style.subtitle}>
        <BsFillTelephoneFill /> {phone}
      </h2>
      {whatsapp && <a href={`https://wa.me/${whatsapp}`} target="blank" className={style.subtitle}><FaWhatsapp /> {phone}</a>}
      {email && <h2 className={style.subtitle}><AiOutlineMail /> <a href={`mailto:${email}`}>{email}</a></h2>}
    </div>
  );
};

export default ContactCard;
