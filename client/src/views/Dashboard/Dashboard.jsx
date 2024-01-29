import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { ComplexesDashboard, PublicationsDashboard, Panel, SideBar, Top, Users } from "../../components";

import style from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getComplexes, getPublications, getUsers } from "../../redux/actions";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("");

  const signOut = useSignOut();
  const [_, token] = useAuthHeader().split(' ');
  const authUser = { ...useAuthUser(), token };
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const allPublications = useSelector((state) => state.publications);
  const allComplexes = useSelector((state) => state.complexes);
  const allUsers = useSelector((state) => state.users);

  const signOutAction = () => {
    signOut();
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getComplexes()).then(() => dispatch(getPublications()).then(() => dispatch(getUsers(token))));
  }, []);

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
            {activeComponent === "" && (
              <Panel user={authUser} publications={allPublications} complexes={allComplexes} users={allUsers} />
            )}
            {activeComponent === "publications" && (
              <PublicationsDashboard publications={allPublications} user={authUser} />
            )}
            {activeComponent === "complexes" && <ComplexesDashboard complexes={allComplexes} user={authUser} />}
            {activeComponent === "users" && authUser.rol && <Users />}
          </div>
        </div>
      </div>
    </div>
  );
}
