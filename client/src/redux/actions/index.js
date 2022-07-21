import axios from "axios";

export const GET_BY_ID = "GET_BY_ID";
export const GET_ALL = "GET_ALL";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const CREADO = "CREADO";
export const TIPO = "TIPO";
export const ORDEN = "ORDEN";

export const getAll = () => {
  return async (dispatch) => {
    let response = await axios.get("http://localhost:3001/pokemon");
     dispatch({ type: GET_ALL, payload: response.data });
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    let response = await axios.get(
      "http://192.168.0.18:3001/pokemons?name=" + name
    );
    dispatch({ type: GET_ALL, payload: response.data });
  };
};

export const getById = (id) => {
  return async (dispatch) => {
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    dispatch({ type: GET_BY_ID, payload: response.data });
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    let response = await axios.get("http://localhost:3001/type");
    dispatch({ type: GET_TYPES, payload: response.data });
  };
};

export const creado = (pokemons) => {
  return (dispatch) =>{
  dispatch({
    type: CREADO,
    payload: pokemons,
  });}
};

export const tipo = (pokemons) => {
  return (dispatch) =>{
  dispatch({
    type: TIPO,
    payload: pokemons,
  });}
};

export const orden = (pokemons) => {
  return (dispatch) => {
  dispatch({
    type: ORDEN,
    payload: pokemons,
  });}
};