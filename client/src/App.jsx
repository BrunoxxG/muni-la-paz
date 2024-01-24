import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar, Footer } from "./components";
import { Contacts, Home, Notices, Login, Dashboard } from "./views";

import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import RequireAuth from '@auth-kit/react-router/RequireAuth'
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

import "./App.css";

function App() {
  return (
    <div className="container">
      <AuthProvider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/noticias" element={<Notices />} />
            <Route exact path="/contacto" element={<Contacts />} />
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/dashboard"
              element={
                <RequireAuth fallbackPath={"/login"}>
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
