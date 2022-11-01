import { SET_DOGS, SET_TEMPERAMENT, GET_DETAILS } from "../action/dogsActions";

const INITIAL_STATE = {
  dogs: [],
  temperaments: [],
  detail: [],
};

export function dogsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_DETAILS:
      return {
        ...state,
        detail: payload,
      };
    case SET_DOGS:
      return {
        ...state,
        dogs: payload,
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
