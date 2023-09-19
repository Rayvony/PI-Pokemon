import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import { getAllPkmns, getTypes, getPkmnByName } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPkmns());
  }, [dispatch]);

  const onSearch = async (name) => {
    try {
      await dispatch(getPkmnByName(name));
    } catch (error) {
      console.error("Error al buscar Pokémon:", error);
    }
  };

  return (
    <div>
      <Nav onSearch={onSearch} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
