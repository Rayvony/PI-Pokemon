const URL = "https://pokeapi.co/api/v2/pokemon/"
const { mapProperties } = require('../helpers/mapProperties');
const axios = require("axios");
const { Pokemon } = require('../db');
const { Op } = require('sequelize');

const getPkmn = async (req, res) => {
  try {
    const { search } = req.params;
    const idOrName = search.toLowerCase();

    // Intenta buscar el Pokémon en la base de datos por ID o nombre
    const dbPokemon = await Pokemon.findOne({
      where: {
        [Op.or]: [
          { id: idOrName },
          { name: idOrName }
        ]
      }
    });

    if (dbPokemon) {
      // Si se encuentra en la base de datos, retorna el Pokémon de la base de datos
      return res.status(200).json(dbPokemon);
    }

    // Si no se encuentra en la base de datos, busca en la API
    const { data } = await axios(`${URL}/${idOrName}`);
    if (data.name) {
      const apiPokemon = mapProperties(data);
      // También puedes guardar el Pokémon en la base de datos aquí si lo deseas
      return res.status(200).json(apiPokemon);
    }

    return res.status(404).send('Not found');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getPkmn,
};