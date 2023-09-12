const { Pokemon, Type } = require('../db');
const { validateFields } = require('../helpers/validateFields');

async function postPkmn(req, res) {
  let { name, weight, height, sprite, hp, atk, def, spAtk, spDef, spd, type1, type2 } = req.body;

  //si no valida, se le asigna sprite fantasma
  if (!sprite || typeof sprite !== 'string' || sprite.trim() === '') {
    sprite = "https://archives.bulbagarden.net/media/upload/6/62/Ghost_I_purple.png";
  }

  const fieldsToCheck = {
    name,
    weight,
    height,
    hp,
    atk,
    def,
    spAtk,
    spDef,
    spd,
    type1,
    type2,
  };

  const validationErrors = validateFields(fieldsToCheck);

  if (validationErrors.length > 0) {
    return res.status(400).json({ message: validationErrors.join('. ') });
  }

  try {
    // Verificar si los tipos existen en la base de datos
    const existingType1 = await Type.findByPk(type1);
    let existingType2 = null;
    
    // Si hay type2, verifica si existe en la base de datos
    if (type2) {
      existingType2 = await Type.findByPk(type2);
    }
    
    // Si type1 no existe
    if (!existingType1) {
      return res.status(400).json({ message: 'El tipo 1 no existe en la base de datos.' });
    }

    // Crear pokemon
    const newPokemon = await Pokemon.create({
      name,
      weight,
      height,
      sprite,
      hp,
      atk,
      def,
      spAtk,
      spDef,
      spd,
    });
    
    // Asignar type1 al Pokémon
    await newPokemon.addType(existingType1);

    // Si hay type2 y existe se asigna
    if (existingType2) {
      await newPokemon.addType(existingType2);
    }

    return res.status(201).json(newPokemon);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { postPkmn };

