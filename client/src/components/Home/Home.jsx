import React, { useState } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import "./Home.css";

export default function Home() {
  const { pokemonByName, allPokemons } = useSelector((state) => state);

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * itemsPerPage;

  // Utiliza pokemonByName si tiene datos, de lo contrario, usa allPokemons
  const currentPokemons =
    pokemonByName.length > 0 ? pokemonByName : allPokemons;

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
      <div className="containerCards">
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
