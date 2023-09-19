import {
  GET_ALLPKMNS,
  GET_TYPES,
  FILTER,
  ORDER,
  GET_PKMNBYNAME,
  GET_PKMNBYID,
  DELETE_PKMNBYNAME,
  FILTER_TYPE,
  ORDER_ATK,
} from "./actionTypes";

const initialState = {
  pkmnTypes: [],
  allPokemons: [],
  filterPkmn: [],
  pokemonByName: [],
  pokemonByID: [],
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALLPKMNS:
      return { ...state, allPokemons: payload, filterPkmn: payload };
    case GET_PKMNBYNAME:
      return { ...state, pokemonByName: payload };
    case GET_PKMNBYID:
      return { ...state, pokemonByID: payload };
    case DELETE_PKMNBYNAME:
      return { ...state, pokemonByName: [] };
    case GET_TYPES:
      return { ...state, pkmnTypes: payload };

    case FILTER:
      let filteredPokemons;
      if (payload === "true") {
        filteredPokemons = state.filterPkmn.filter(
          (pkmn) => !Number.isInteger(pkmn.id)
        );
      } else if (payload === "false") {
        filteredPokemons = state.filterPkmn.filter((pkmn) =>
          Number.isInteger(pkmn.id)
        );
      } else {
        filteredPokemons = state.filterPkmn;
      }
      return {
        ...state,
        allPokemons: filteredPokemons,
      };

    case ORDER:
      if (payload === "A") {
        const orderPKMN = state.filterPkmn
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
        return {
          ...state,
          allPokemons: [...orderPKMN],
        };
      } else if (payload === "D") {
        const orderPKMN = state.filterPkmn
          .slice()
          .sort((a, b) => b.name.localeCompare(a.name));
        return {
          ...state,
          allPokemons: [...orderPKMN],
        };
      } else {
        return {
          ...state,
          allPokemons: state.filterPkmn,
        };
      }

    case ORDER_ATK:
      const orderByAtk = state.filterPkmn.slice().sort((a, b) => {
        const atkA = Number(a.atk);
        const atkB = Number(b.atk);

        if (payload === "A") return atkA - atkB;
        return atkB - atkA;
      });

      return {
        ...state,
        allPokemons: orderByAtk,
      };
    case FILTER_TYPE:
      const filteredByType = state.filterPkmn.filter((pkmn) =>
        pkmn.types.some((type) => payload.includes(type.id))
      );
      return {
        ...state,
        allPokemons: filteredByType,
      };

    default:
      return { ...state };
  }
}

export default reducer;
