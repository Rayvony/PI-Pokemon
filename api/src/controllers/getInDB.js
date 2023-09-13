const { Pokemon, Type } = require('../db');
const {mapTypes} = require('../helpers/mapTypes');
const {handleErrors} = require('../helpers/handleErrors');


const getInDB = async (method, idOrName) => {
  try {
    switch (method) {
      case 1:
        const pkmnFromDB = await Pokemon.findOne({
          where: { name: idOrName },
          include: [
            {
              model: Type,
              attributes: ['name'],
            },
          ],
        });

        if (!pkmnFromDB) {
          return handleErrors(1);
        }

        return { fromDB: mapTypes(pkmnFromDB) };
      
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

