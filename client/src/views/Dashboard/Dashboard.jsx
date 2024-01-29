import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { Complexes, Notices, Panel, SideBar, Top, Users } from "../../components";

import style from "./Dashboard.module.css";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('');

  const signOut = useSignOut();
  const authUser = useAuthUser();
  const navigate = useNavigate();

  const signOutAction = () => {
    signOut();
    navigate("/login");
  };

  const handleLinkClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className={style.body}>
      <div className={style.container}>
        <SideBar user={authUser} signOut={signOutAction} onLinkClick={handleLinkClick} />
        <div className={style.mainContent}>
          <Top />
          <div className={style.bottom}>
          {activeComponent === "" && (<Panel user={authUser}/>)}
            {activeComponent === "notices" && (<Notices />)}
            {activeComponent === "complexes" && (<Complexes />)}
            {activeComponent === "users" && (<Users />)}
          </div>
        </div>
      </div>
    </div>
  );
}
