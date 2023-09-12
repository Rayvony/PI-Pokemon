const mapProperties = (data) => {
    const { id, name, weight, height, stats, sprites, types } = data;
    const sprite = sprites.front_default;
  
    const statsMap = {};
    for (const stat of stats) {
      statsMap[stat.stat.name] = stat.base_stat;
    }
  
    const hp = statsMap["hp"];
    const atk = statsMap["attack"];
    const def = statsMap["defense"];
    const spAtk = statsMap["special-attack"];
    const spDef = statsMap["special-defense"];
    const spd = statsMap["speed"];
  
    return {
      id,
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
      types: types.map((typeData) => ({
        id: typeData.type.url.split('/').filter(Boolean).pop(),
        name: typeData.type.name,
      })),
    };
  };
  
  module.exports = {
    mapProperties,
  };