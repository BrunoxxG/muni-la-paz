import { Routes, Route, useLocation } from "react-router-dom";
import { NavBar, Footer } from "./components";
import { Contacts, Home, Notices, Login, Dashboard } from "./views";


import RequireAuth from '@auth-kit/react-router/RequireAuth'

import "./App.css";
import Detail from "./views/DetailComplex/Detail";

function App() {
  const location = useLocation();

  return (
    <div className="container">
        {!location.pathname.startsWith('/dashboard') && <NavBar />}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/noticias" element={<Notices />} />
            <Route exact path="/contacto" element={<Contacts />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/complexes/:id" element={<Detail />} />
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
          {!location.pathname.startsWith('/dashboard') && <Footer />}
    </div>
  );
}

export default App;
