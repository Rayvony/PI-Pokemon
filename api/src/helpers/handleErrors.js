function handleErrors(errorCase) {
    switch (errorCase) {
      case 1:
        throw new Error ('No se encontró ningún Pokémon con el nombre proporcionado.');
      case 2:
        throw new Error ('No se encontró ningún Pokémon con el ID proporcionado.');
      case 3:
        throw new Error ('No se encontró ningún tipo con el ID proporcionado.');
      case 4:
        throw new Error ('Ocurrió un error al buscar el Pokémon en la base de datos.');
      case 5:
        throw new Error ('Error tipo 5: Error desconocido.');
      case 6:
        throw new Error('Ocurrió un error al agregar un nuevo Pokémon en la base de datos.');
      default:
        throw new Error ('Error: ' + errorCase);
    }
  }

  module.exports = {
    handleErrors,
  };