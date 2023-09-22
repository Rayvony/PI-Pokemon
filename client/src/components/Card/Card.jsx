import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ id, sprite, name, types }) {
  const typeElements = types.map((type) => (
    <div key={type.id} className={`icon ${type.name}`}>
      <img src={`/assets/icons/${type.id}.svg`} alt={type.name} />
    </div>
  ));

  return (
    <div className="cardContainer">
      <Link to={`/detail/${id}`}>
        <div className="Card">
          <img src={sprite} alt={name} />
          <h2>{name}</h2>
          <h3>Types:</h3>
          <div className="wrapper">{typeElements}</div>
        </div>
      </Link>
    </div>
  );
}
