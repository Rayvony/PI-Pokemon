const URL = "https://pokeapi.co/api/v2/type/";
const axios = require("axios");
const { Type } = require("../db"); // Importa tu modelo de Sequelize

let cachedTypes = null; // Variable para almacenar los tipos en caché

const getTypes = async (req, res) => {
    try {
        // Si ya hay en cache
        if (cachedTypes !== null) {
            return res.status(200).json(cachedTypes);
        }

        // Si no cache, verifica si existen tipos en la base de datos
        const typesFromDB = await Type.findAll();

        // Si hay tipos, guarda en cache y devuelve
        if (typesFromDB.length > 0) {
            cachedTypes = typesFromDB;
            return res.status(200).json(typesFromDB);
        }

        // Si no hay, guarda los tipos de la api
        const { data } = await axios(URL);
        const types = data.results.map(typeData => {
            const id = typeData.url.split('/').filter(Boolean).pop();
            const name = typeData.name;
            return {
                id,
                name,
            };
        });

        // Guarda los tipos en la base de datos
        await Type.bulkCreate(types);

        cachedTypes = types;

        return res.status(200).json(types);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getTypes
};
