import axios from "axios";
import {
  GET_ALLPKMNS,
  FILTER,
  ORDER,
  GET_TYPES,
  GET_PKMNBYNAME,
  GET_PKMNBYID,
  DELETE_PKMNBYNAME,
  FILTER_TYPE,
  ORDER_ATK,
} from "./actionTypes";

export const getAllPkmns = () => {
  const endpoint = "http://localhost:3001/proyectoPKMN/pokemons/";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_ALLPKMNS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
      throw new Error("No se encontraron pokémones");
    }
  };
};

export const getTypes = () => {
  const endpoint = "http://localhost:3001/proyectoPKMN/types/";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_TYPES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
      throw new Error("No se encontraron tipos");
    }
  };
};

export const getPkmnByName = (name) => {
  const endpoint = `http://localhost:3001/proyectoPKMN/pokemon/name?value=${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_PKMNBYNAME,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
      throw new Error("No se encontro un pokemon con ese nombre");
    }
  };
};

export const getPkmnByID = (id) => {
  const endpoint = `http://localhost:3001/proyectoPKMN/pokemon/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_PKMNBYID,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
      throw new Error("No se encontro un pokemon con ese id");
    }
  };
};

export const deletePkmnByName = () => {
  return {
    type: DELETE_PKMNBYNAME,
  };
};

export const filter = (isFromDB) => {
  return {
    type: FILTER,
    payload: isFromDB,
  };
};

export const filterType = (typeID) => {
  return {
    type: FILTER_TYPE,
    payload: typeID,
  };
};

export const order = (orderType, payload) => {
  switch (orderType) {
    case "atk":
      return {
        type: ORDER_ATK,
        payload,
      };

    case "name":
      return {
        type: ORDER,
        payload,
      };

    default:
      return {
        type: ORDER,
        payload: "none",
      };
  }
};

export const orderAtk = (payload) => ({
  type: ORDER_ATK,
  payload,
});
