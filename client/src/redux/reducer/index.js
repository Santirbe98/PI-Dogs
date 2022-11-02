import {
  SET_DOGS,
  SET_TEMPERAMENT,
  GET_DETAILS,
  GET_NAME_DOG,
} from "../action/dogsActions";

const INITIAL_STATE = {
  dogs: [],
  temperaments: [],
  detail: [],
};
export default function rootReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SET_DOGS:
      return {
        ...state,
        dogs: payload,
      };
    case GET_NAME_DOG:
      return {
        ...state,
        dogs: payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        detail: payload,
      };
    case SET_TEMPERAMENT:
      return {
        ...state,
        temperaments: payload,
      };
    default:
      return state;
  }
}
