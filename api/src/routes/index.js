const { getAllPkmn } = require("../controllers/getAllPkmn");
const { getPkmn } = require("../controllers/getPkmn");
const { getPkmnByName } = require("../controllers/getPkmnByName");
const { postPkmn } = require("../controllers/postPkmn");
const { getTypes } = require("../controllers/getTypes");
const router = require("express").Router()

router.get("/pokemons/:page?", getAllPkmn);

// Obtener un pokémon por su nombre (query)
router.get("/pokemon/name", getPkmnByName);

// Obtener un pokémon por su ID o nombre (desde la api)
router.get("/pokemon/:search", getPkmn);


router.post("/pokemon", postPkmn);

router.get("/types", getTypes);

module.exports = router;