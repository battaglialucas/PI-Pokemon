import { GET_BY_NAME, GET_ALL, GET_BY_ID, GET_TYPES, CREADO, TIPO, ORDEN } from "../actions";

const initialState = {
  pokemonsParaFiltrar: [],
  pokemons: [],
  types: [],
  orden: "",
};

const Actions = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_BY_ID:
      return {
        ...state,
        pokemons: payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        pokemons: payload,
      };

      case GET_TYPES:
      return {
        ...state,
        types: payload,
      };

    case GET_ALL:
      return {
        ...state,
        pokemonsParaFiltrar: payload,
        pokemons: payload,
      };

      case TIPO:
        return {
          ...state,
          pokemons: payload,
        };

      case CREADO:
        return {
          ...state,
          pokemons: payload,
        };

      case ORDEN:
        return {
          ...state,
          pokemons: payload[0],
          orden: payload[1]
        };

    default:
      return state;
  }
};

export default Actions;