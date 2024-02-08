import { useState } from "react";
import style from "./UserForm.module.css";

export default function UserForm({user, authUser}) {
  const [input, setInput] = useState({
    name: "",
    email: "",
    rol: ""
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>FORM USER</h1>
      <form className={style.form}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
            placeholder="Nombre"
          />
        </div>
      </form>
    </div>
  );
}