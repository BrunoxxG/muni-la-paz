import React, { useState } from 'react';
import { DocumentPDF, DocumentForm } from "../..";
import { useDispatch } from "react-redux";

import style from "./DocumentsDashboard.module.css";

export default function DocumentsDashboard({documents, authUser}) {
  
  const [viewForm, setViewForm] = useState({
    visible: false,
    data: {}
  });

  const dispatch = useDispatch();

  const handleForm = (event, item) => {
    event.stopPropagation(); 
    const dataItem = item
    const formActive = event.currentTarget.name
    if (formActive === "cancel") {
      setViewForm({
        visible: false,
        data: {},
      });
    } else {
      setViewForm({
        visible: true,
        data: dataItem
      });
    }
  };

  if (viewForm.visible) {
    return (
      <div>
        <button className={style.btn} name="cancel" onClick={handleForm}>
          CANCELAR
        </button>
        <DocumentForm document={viewForm.data} authUser={authUser} />
      </div>
    );
  }

  return (
    <div className={style.complexesSection}>
      <h2>TODOS LOS DOCUMENTOS</h2>
      <div className={style.gridDiv}>
        {/* <div className={style.SearchBar}>
          <SearchBar handleChange={handleChange} />
        </div> */}
        <div className={style.complexes}>
          {documents?.map((document, index) => (
            <DocumentPDF key={index} document={document} authUser={authUser} handleForm={handleForm} />
          ))}
        </div>
      </div>
    </div>
  );
}