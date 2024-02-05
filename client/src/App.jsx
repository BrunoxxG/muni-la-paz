import { Routes, Route, useLocation } from "react-router-dom";
import { NavBar, Footer } from "./components";
import { Contacts, Home, Publications, Login, Dashboard, Complexes, ComplexDetail } from "./views";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComplexes, getPublications } from "./redux/actions";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

import "./App.css";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const allPublications = useSelector((state) => state.publications);
  const allComplexes = useSelector((state) => state.complexes);
  
  useEffect(() => {
    dispatch(getComplexes()).then(() => dispatch(getPublications()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {!location.pathname.startsWith("/dashboard") && <NavBar />}
      <Routes>
        <Route exact path="/" element={<Home publications={allPublications} complexes={allComplexes}/>} />
        <Route exact path="/noticias" element={<Publications publications={allPublications}/>} />
        <Route exact path="/contacto" element={<Contacts />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/alojamientos" element={<Complexes complexes={allComplexes}/>} />
        <Route exact path="/alojamientos/:id" element={<ComplexDetail complexes={allComplexes}/>} />
        <Route
          exact
          path="/dashboard/*"
          element={
            <RequireAuth fallbackPath={"/login"}>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
      {!location.pathname.startsWith("/dashboard") && <Footer />}
    </div>
  );
}

export default App;
