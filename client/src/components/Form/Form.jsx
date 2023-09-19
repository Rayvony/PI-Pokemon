import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postPkmn } from "../../api-helpers/apiService";
import { validate } from "./validate";
import "./Form.css";

export default function Form() {
  const pkmnTypes = useSelector((state) => state.pkmnTypes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    hp: "",
    sprite: "",
    atk: "",
    spAtk: "",
    def: "",
    spDef: "",
    spd: "",
    height: "",
    weight: "",
    type1: "",
    type2: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = value === "noType" ? "" : value;
    const lowercaseName =
      name === "name" ? updatedValue.toLowerCase() : updatedValue;
    setFormData({
      ...formData,
      [name]: lowercaseName,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await postPkmn(formData);
      console.log("pokemon creado");
      navigate("/home");
    } catch (error) {
      console.log(formData);
      console.log("Error al crear pokemon");
    }
  };

  return (
    <div className="formContainer">
      <h2 className="formTitle">Crea tu Pokémon</h2>
      <form onSubmit={handleSubmit}>
        <label className="formLabel">Nombre:</label>
        <input
          className="formInput"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label className="formLabel">HP:</label>
        <input
          className="formInput"
          type="text"
          name="hp"
          value={formData.hp}
          onChange={handleInputChange}
          required
        />

        <label className="formLabel">Sprite:</label>
        <input
          className="formInput"
          type="text"
          name="sprite"
          value={formData.sprite}
          onChange={handleInputChange}
        />

        <label className="formLabel">ATK:</label>
        <input
          className="formInput"
          type="text"
          name="atk"
          value={formData.atk}
          onChange={handleInputChange}
          required
        />

        <label className="formLabel">SP.ATK:</label>
        <input
          className="formInput"
          type="text"
          name="spAtk"
          value={formData.spAtk}
          onChange={handleInputChange}
          required
        />

        <label className="formLabel">DEF:</label>
        <input
          className="formInput"
          type="text"
          name="def"
          value={formData.def}
          onChange={handleInputChange}
          required
        />

        <label className="formLabel">SP.DEF:</label>
        <input
          className="formInput"
          type="text"
          name="spDef"
          value={formData.spDef}
          onChange={handleInputChange}
          required
        />

        <label className="formLabel">SPD:</label>
        <input
          className="formInput"
          type="text"
          name="spd"
          value={formData.spd}
          onChange={handleInputChange}
          required
        />

        <label className="formLabel">Altura:</label>
        <input
          className="formInput"
          type="text"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          required
        />

        <label className="formLabel">Peso:</label>
        <input
          className="formInput"
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          required
        />

        <label className="formLabel">Tipo 1:</label>
        <select
          className="formInput formSelect"
          name="type1"
          value={formData.type1}
          onChange={handleInputChange}
        >
          <option value="Tipo 1">Tipo 1</option>
          {pkmnTypes?.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <label className="formLabel">Tipo 2:</label>
        <select
          className="formInput formSelect"
          name="type2"
          value={formData.type2}
          onChange={handleInputChange}
          disabled={formData.type1 === formData.type2}
        >
          <option value="noType"> - </option>
          {pkmnTypes?.map((type) => (
            <option
              key={type.id}
              value={type.id}
              disabled={type.id === formData.type1}
            >
              {type.name}
            </option>
          ))}
        </select>

        <button
          className="formButton"
          type="submit"
          disabled={!validate(formData)}
        >
          Crear Pokémon
        </button>
      </form>
    </div>
  );
}
