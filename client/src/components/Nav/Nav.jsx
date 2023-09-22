import React from "react";
import SearchBar from "../Searchbar/Searchbar";
import { NavLink, useLocation } from "react-router-dom";
import Filters from "../Filters/Filters";
import { useDispatch } from "react-redux";
import { deletePkmnByName } from "../../redux/actions";
import "./Nav.css";

export default function Nav({ onSearch, toggleMusic, isPlaying }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = () => {
    dispatch(deletePkmnByName());
  };

  if (location.pathname !== "/") {
    return (
      <header>
        <nav className="nav">
          <div className="botonesNav">
            <NavLink to="/home">
              <button
                className="material-symbols-outlined"
                onClick={handleClick}
              >
                home
              </button>
            </NavLink>

            <NavLink to="/form">
              <button className="material-symbols-outlined">create</button>
            </NavLink>

            <button onClick={toggleMusic} className="material-symbols-outlined">
              {isPlaying ? "volume_up" : "volume_off"}
            </button>
          </div>
          <img
            className="pokemonLogo"
            src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
            alt="Pokémon Logo"
          ></img>

          <SearchBar onSearch={onSearch} />
          <Filters />
        </nav>
      </header>
    );
  }
  return null;
}
