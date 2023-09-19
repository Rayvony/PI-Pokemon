import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPkmnByID } from "../../redux/actions";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  const pokemonByID = useSelector((state) => state.pokemonByID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPkmnByID(id));
  }, []);

  if (!pokemonByID) {
    return <div className="Detail">No se encontró Pokémon</div>;
  }
  console.log(pokemonByID);
  return (
    <div className="DetailContainer">
      <div className="Detail">
        <img src={pokemonByID.sprite} alt={pokemonByID.name} />
        <h2>{pokemonByID.name}</h2>
        <p>ID: {id}</p>
        <p>HP: {pokemonByID.hp}</p>
        <p>
          ATK: {pokemonByID.atk} SP.ATK: {pokemonByID.spAtk}
        </p>
        <p>
          DEF: {pokemonByID.def} SP.DEF: {pokemonByID.spDef}
        </p>
        <p>SPD: {pokemonByID.spd}</p>
        <p>
          Altura: {pokemonByID.height} Peso: {pokemonByID.weight}
        </p>
        <p>Tipos: {pokemonByID?.types?.map((type) => type.name).join(", ")}</p>
      </div>
    </div>
  );
}
