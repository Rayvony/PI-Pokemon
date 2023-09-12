const { mapProperties } = require('../helpers/mapProperties');
const axios = require("axios");
const limit = 24;

const getAllPkmn = async (req, res) => {
  try {
    const page = parseInt(req.params.page, 10 ) || 1;
    const offset = (page - 1) * limit;
    const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const { data } = await axios(URL);
    const pokemonList = data.results;

    const pokemonDetails = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const { data } = await axios(pokemon.url);
        const mappedPokemon = mapProperties(data); 

        return mappedPokemon;
      })
    );

    return res.status(200).json(pokemonDetails);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllPkmn
};
