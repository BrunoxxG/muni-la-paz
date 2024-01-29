import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { URL_BASE } from "../../utils/const";

import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./Login.module.css";
import logo from "../../assets/logo.png";

export default function Login() {
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState("");

  const handleInput = function (event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogIn = async function (event) {
    event.preventDefault();
    try {
      const response = await axios.post(`${URL_BASE}/users/login`, input);
      if (response.status === 200) {
        const userState = {
          email: input.email,
          name: response.data.name,
          ...(response.data.rol && { rol: response.data.rol }),
        };
        
        signIn({
          auth: {
            token: response.data.token,
          },
          userState: userState,
        });
        setInput({
          email: "",
          password: "",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      setLoginStatus(error.response.data.message);
      setTimeout(() => {
        setLoginStatus("");
      }, 4000);
    }
  };

  if (isAuthenticated()) {
    return <Navigate to={"/dashboard"} replace />;
  } else {
    return (
      <main className={style.login}>
        <div className={style.container}>
          <div className={style.rightDiv}>
            <div className={style.textDiv}>
              <h2>Acceso a personal municipal</h2>
              <p>Esta aplicación es de uso exclusivo para empleados de la Municipalidad de La Paz.</p>
            </div>
            <div className={style.footerRightDiv}>
              <h3>¿No tiene nombre de usuario?</h3>
              <span>Solicítelo al encargado del área correspondiente.</span>
            </div>
          </div>
          <div className={style.formDiv}>
            <div className={style.formHeader}>
              <img src={logo} alt="Logo Image" className={style.image} />
            </div>
            <form onSubmit={handleLogIn} className={style.form}>
              {loginStatus && <span className={style.showMessage}>{loginStatus}</span>}
              <div className={style.inputDiv}>
                <label htmlFor="email">Email</label>
                <div className={style.input}>
                  <FaUserShield className={style.icon} />
                  <input type="email" name="email" placeholder="Ingrese Email" onChange={handleInput} />
                </div>
              </div>
              <div className={style.inputDiv}>
                <label htmlFor="password">Password</label>
                <div className={style.input}>
                  <BsFillShieldLockFill className={style.icon} />
                  <input type="password" name="password" placeholder="Ingrese Password" onChange={handleInput} />
                </div>
              </div>
              <button type="submit" className={style.btn}>
                <span>Ingresar</span>
                <FaArrowRightLong className={style.icon} />
              </button>
              <span className={style.forgotPassword}>
                Olvidaste tu contraseña? <a href="">Click aquí</a>
              </span>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
