import { Routes, Route } from "react-router-dom";
import { NavBar, Footer } from "./components";
import { Contacts, Home, Notices } from "./views";
import "./App.css";


function App() {
  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/noticias" element={<Notices />} />
        <Route exact path="/contacto" element={<Contacts />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

