import { useState } from "react";
import { format, setDefaultOptions } from "date-fns";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
setDefaultOptions({ locale: es });

import style from "./PublicationForm.module.css";
import "react-day-picker/dist/style.css";
import axios from "axios";
import { getPublications } from "../../../redux/actions";
import { URL_BASE } from "../../../utils/const";
import { useDispatch } from "react-redux";

export default function PublicationForm({ publication, authUser }) {
  const dispatch = useDispatch();

  const allTypes = ["General", "Eventos", "Salud", "Institucional", "Deportes", "Concejo", "Servicios"];
  const [input, setInput] = useState({
    title: publication?.title || "",
    description: publication?.description || "",
    image: "prueba",
    type: publication?.type || "General",
    date: publication?.date || new Date(),
  });

  let footer;
  if (input.date) {
    footer = (
      <p>
        Fecha seleccionada: <b>{format(input.date, "P")}</b>.
      </p>
    );
  }

  const handleChange = (e) => {
    if (e instanceof Date) {
      setInput({
        ...input,
        ["date"]: e,
      });
      console.log(input);
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }

    // console.log(input);
    // setErrors(
    //     validateModifiedItem({
    //         ...input,
    //         [e.target.name]: e.target.value,
    //     })
    // );
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL_BASE}/publications`, input, {
        headers: { Authorization: authUser.token },
      });
      if (response.status === 200) {
        dispatch(getPublications());
        setInput({
          title: "",
          description: "",
          image: "prueba",
          type: "General",
          date: new Date(),
        });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleEdit = () => {
    alert("EDITAAA");
  };

  // console.log(input)

  return (
    <div>
      {publication ? (
        <div>
          <h1>FORM EDIT PUBLICATION</h1>
          <form onSubmit={handleEdit} className={style.form}>
            <div className=" w-2/5">
              <label className="block mb-2 text-m font-medium text-gray-900 ">Titulo</label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Your product name"
              />
              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>
            <div className=" w-2/5">
              <label className="block mb-2 text-m font-medium text-gray-900 ">Descripción</label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Your product name"
              />
              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>
            <div className=" w-2/5">
              <label className="block mb-2 text-m font-medium text-gray-900 ">Tipo</label>
              <select
                className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                name="type"
                value={input.type}
                onChange={handleChange}
              >
                {allTypes?.map((type, index) => {
                  return <option key={index}>{type}</option>;
                })}
              </select>
              {/* {errors.category && <p className=" text-red-600 text-sm font-semibold ">{errors.category}</p>} */}
            </div>
            {input.type === "Eventos" && (
              <div className=" w-2/5">
                <DayPicker
                  mode="single"
                  locale={es}
                  onDayClick={handleChange}
                  defaultMonth={input.date}
                  selected={selected}
                  onSelect={setSelected}
                  footer={footer}
                />
                {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
              </div>
            )}
            <button>EDITAR</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>FORM CREATE PUBLICATION</h1>
          <form onSubmit={handleCreate} className={style.form}>
            <div className=" w-2/5">
              <label className="block mb-2 text-m font-medium text-gray-900 ">
                Titulo{" "}
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Titulo"
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>
            <div className=" w-2/5">
              <label className="block mb-2 text-m font-medium text-gray-900 ">
                Descripción{" "}
                <input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Descripción"
                />
              </label>

              {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}
            </div>
            <div className=" w-2/5">
              <label className="block mb-2 text-m font-medium text-gray-900 ">
                Tipo{" "}
                <select
                  className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  name="type"
                  value={input.type}
                  onChange={handleChange}
                >
                  {allTypes?.map((type, index) => {
                    return <option key={index}>{type}</option>;
                  })}
                </select>
              </label>

              {/* {errors.category && <p className=" text-red-600 text-sm font-semibold ">{errors.category}</p>} */}
            </div>
            {input.type === "Eventos" && (
              <div className=" w-2/5">
                {/* {errors.name && <p className=" text-red-600 text-sm font-semibold ">{errors.name}</p>} */}

                <DayPicker
                  mode="single"
                  locale={es}
                  onDayClick={handleChange}
                  defaultMonth={input.date}
                  selected={input.date}
                  footer={footer}
                />
              </div>
            )}
            <button type="submit">CREAR</button>
          </form>
        </div>
      )}
    </div>
  );
}