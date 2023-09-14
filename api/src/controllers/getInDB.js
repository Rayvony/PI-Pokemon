const { Pokemon, Type } = require('../db');
const {mapTypes} = require('../helpers/mapTypes');
const {handleErrors} = require('../helpers/handleErrors');


const getInDB = async (method, idOrName) => {
  try {
    switch (method) {
      case 1:
        const pkmnFromDB = await Pokemon.findAll({
          where: { name: idOrName },
          include: [
            {
              model: Type,
              attributes: ['id', 'name'],
            },
          ],
        });
      
        if (!pkmnFromDB || pkmnFromDB.length === 0) {
          return handleErrors(1);
        }
        const mappedData = pkmnFromDB.map((pokemon) => mapTypes(pokemon));
      
        return mappedData;
      
      case 2:
        const dbPokemon = await Pokemon.findOne({
          where: { id: idOrName },
          include: [
            {
              model: Type,
              attributes: ['name'],
            },
          ],
        });

        if (!dbPokemon) {
          return handleErrors(2);
        }

        return { fromDB: mapTypes(dbPokemon) };

        case 3:
          const type = await Type.findOne({ where: { id: idOrName } });
        
          if (!type) {
            return handleErrors(3);
          }
          return type.id;

      default:
        return handleErrors("Caso no válido.");
    }
  } catch (error) {
    console.error(error);
    handleErrors(4);
  }
};

module.exports = {
  getInDB
};

