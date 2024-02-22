import { useState } from "react";
import style from "./ComplexForm.module.css";

export default function ComplexForm({complex, authUser}) {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>FORM COMPLEX</h1>
      <form className={style.form}>
        <div>
          <label>Descripción</label>
          <input
            type="text"
            name="description"
            value={input.description}
            onChange={handleChange}
            placeholder="Descripción"
          />
        </div>
      </form>
    </div>
  );
}
