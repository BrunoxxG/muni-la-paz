import separatorNav from "../../assets/separatorNav.svg";
import { Carrousel } from "../../components";
import style from "./Home.module.css";

export default function Home() {

  return (
    <div>
      <img src={separatorNav} className={style.separatorNav} alt="separatorNav" />
      <Carrousel />
      <h1>Home</h1>
    </div>
  );
}
