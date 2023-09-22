import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPkmnByID } from "../../redux/actions";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  const pokemonByID = useSelector((state) => state.pokemonByID);
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    dispatch(getPkmnByID(id));
  }, []);

  const typeElements = pokemonByID.types?.map((type) => (
    <div key={type.id} className={`icon ${type.name}`}>
      <img src={`/assets/icons/${type.id}.svg`} alt={type.name} />
    </div>
  ));

  const handleImageClick = () => {
    if (pokemonByID.cry) {
      const audio = new Audio(pokemonByID.cry);
      audio.play().catch((error) => {
        console.error("Error al reproducir audio:", error);
      });
      setIsPlaying(true);
    }
  };

  if (!pokemonByID) {
    return <div className="Detail">No se encontró Pokémon</div>;
  }
  return (
    <div className="DetailContainer">
      <div className="Detail">
        <img
          src={pokemonByID.sprite}
          alt={pokemonByID.name}
          onClick={handleImageClick}
        />
        <h2>{pokemonByID.name}</h2>
        <div className="stat">
          <span>ID:</span> {id}
        </div>
        <div className="DetailStats">
          <div className="stat">
            <span>HP:</span> {pokemonByID.hp}
          </div>
          <div className="stat">
            <span>SPD:</span> {pokemonByID.spd}
          </div>
          <div className="stat">
            <span>ATK:</span> {pokemonByID.atk}
          </div>
          <div className="stat">
            <span>SP.ATK:</span> {pokemonByID.spAtk}
          </div>
          <div className="stat">
            <span>DEF:</span> {pokemonByID.def}
          </div>
          <div className="stat">
            <span>SP.DEF:</span> {pokemonByID.spDef}
          </div>
          <div className="stat">
            <span>Height:</span> {pokemonByID.height}
          </div>
          <div className="stat">
            <span>Weight:</span> {pokemonByID.weight}
          </div>
        </div>
        <span className="stat">Types:</span>
        <div className="wrapper">{typeElements}</div>
      </div>
    </div>
  );
}
