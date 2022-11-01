import { combineReducers } from "redux";
import { dogsReducer } from "./dogs";
import { SET_APP_IS_LOADING } from "../action/appActios";

const INITIAL_STATE = {
  isLoading: false,
};

function appReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SET_APP_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  app: appReducer,
  dogs: dogsReducer,
});
