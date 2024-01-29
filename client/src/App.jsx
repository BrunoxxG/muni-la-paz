import { Routes, Route, useLocation } from "react-router-dom";
import { NavBar, Footer } from "./components";
import { Contacts, Home, Publications, Login, Dashboard } from "./views";

import RequireAuth from '@auth-kit/react-router/RequireAuth'

import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="container">
        {!location.pathname.startsWith('/dashboard') && <NavBar />}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/noticias" element={<Publications />} />
            <Route exact path="/contacto" element={<Contacts />} />
            <Route exact path="/login" element={<Login />} />
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
