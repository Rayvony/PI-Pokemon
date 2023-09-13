const { getInDB } = require('../controllers/getInDB');
const { handleErrors } = require('../helpers/handleErrors');
const { mapProperties } = require('../helpers/mapProperties');
const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/"

const getPkmnByName = async (req, res) => {
  try {
    const { value } = req.query;
    const nameLC = value.toLowerCase();
    const pkmnFromDB = await getInDB(1, nameLC);
    let pkmnFromAPI = null;
    
    try {
      const { data } = await axios(`${URL}${nameLC}`);
      pkmnFromAPI = mapProperties(data);
    } catch (apiError) {
      if (apiError.response && apiError.response.status === 404) {
      } else {
        handleErrors(apiError);
      }
    }

    // Combina los resultados en foundPkmn
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
