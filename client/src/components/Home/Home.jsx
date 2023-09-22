import React, { useState } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import "./Home.css";

export default function Home() {
  const filterPkmn = useSelector((state) => state.filterPkmn);
  const pokemonByName = useSelector((state) => state.pokemonByName);

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * itemsPerPage;

  // Usa pokemonByName si tiene datos, de lo contrario, usa filterPkmn
  let currentPokemons = filterPkmn;
  if (pokemonByName.length > 0 && pokemonByName !== null) {
    currentPokemons = pokemonByName;
  }

  const nextPage = () => {
    if (startIndex + itemsPerPage < currentPokemons.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="wrapperCards">
        {currentPokemons
          .slice(startIndex, startIndex + itemsPerPage)
          .map((pkmn) =>
            pkmn && pkmn.id ? (
              <Card
                key={pkmn.id}
                id={pkmn.id}
                name={pkmn.name}
                sprite={pkmn.sprite}
                types={pkmn.types}
              />
            ) : null
          )}
      </div>
      <footer className="pagination">
        <button
          className="material-symbols-outlined"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          chevron_left
        </button>
        <div className=" pageSelector">
          <p>{currentPage + 1}</p>
        </div>
        <button
          className="material-symbols-outlined"
          onClick={nextPage}
          disabled={startIndex + itemsPerPage >= currentPokemons.length}
        >
          chevron_right
        </button>
      </footer>
    </div>
  );
}
