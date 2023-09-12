const URL = "https://pokeapi.co/api/v2/pokemon/";
const { mapProperties } = require('../helpers/mapProperties');
const axios = require("axios");
const { response } = require("express");
const { Pokemon } = require('../db');

const getPkmnByName = async (req, res) => {
  try {
    const { value } = req.query;
    const nameLC = value.toLowerCase();

    // Buscar Pokémon en la base de datos por nombre
    const pkmnFromDB = await Pokemon.findAll({ where: { name: nameLC } });

    // Inicializar pkmnFromAPI como null
    let pkmnFromAPI = null;

    try {
      const { data } = await axios(`${URL}${nameLC}`);
      pkmnFromAPI = mapProperties(data);
    } catch (apiError) {
      if (apiError.response && apiError.response.status === 404) {
      } else {
        throw apiError;
      }
    }

    const foundPkmn = {
      fromDB: pkmnFromDB,
      fromAPI: pkmnFromAPI,
    };

    return res.status(200).json(foundPkmn);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getPkmnByName
};