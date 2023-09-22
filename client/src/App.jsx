import React, { useEffect, useState, useRef } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPkmns());
  }, [dispatch]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const onSearch = async (name) => {
    try {
      await dispatch(getPkmnByName(name));
    } catch (error) {
      console.error("Error al buscar Pokémon:", error);
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="./assets/1.m4a"
        autoPlay
        loop
        muted={!isPlaying}
      />
      <Nav
        onSearch={onSearch}
        toggleMusic={toggleMusic}
        isPlaying={isPlaying}
      />
      <Routes>
        <Route path="/" element={<Landing toggleMusic={toggleMusic} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
