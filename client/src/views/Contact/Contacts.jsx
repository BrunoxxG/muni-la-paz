import React from "react";
import style from "./Contacts.module.css";
import ContactCard from "./ContactsCard";

const Contacts = () => {
  return (
    <div className={style.generalContainer}>
      <ContactCard
        title="Acción Social y Oficina de Empleo"
        phone="3544-416691"
        email="oe.lapaz@gmail.com"
      />
      <ContactCard
        title="Reclamos Agua - 8:00 a 13:00"
        phone="3544-496010"
        // faltaPoner="Fuera del horario de atencion al publico"
        // cel=" 3544-651480"
      />
        <ContactCard
        title="Turismo"
        phone="3544-594346"
        email="sectorlapaz@gmail.com"
      />
        <ContactCard
        title="Publicidad-Radio Eventos"
        phone="3544-416376"
        email="oe.lapaz@gmail.com"
      />
        <ContactCard
        title="Acción Social y Oficina de Empleo"
        phone="3544-416691"
        email="oe.lapaz@gmail.com"
      />
        <ContactCard
        title="Acción Social y Oficina de Empleo"
        phone="3544-416691"
        email="oe.lapaz@gmail.com"
      />
        <ContactCard
        title="Acción Social y Oficina de Empleo"
        phone="3544-416691"
        email="oe.lapaz@gmail.com"
      /> 
    </div>
  );
};

export default Contacts;
