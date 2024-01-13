import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components";
import { Home } from "./views";
import "./App.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getComplexes, getPublications } from "./redux/actions";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComplexes())
    .then(() => dispatch(getPublications()));
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

