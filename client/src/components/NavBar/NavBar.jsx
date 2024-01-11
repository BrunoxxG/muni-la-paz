import Logo from '../../assets/logo.png';
import style from './NavBar.module.css';

export default function NavBar() {
  return (
      <nav>
          <img src={Logo} className={style.logo} alt="Logo Municipalidad" />
      </nav>
  );
}