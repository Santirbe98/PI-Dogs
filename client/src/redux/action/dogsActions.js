import axios from "axios";
export const SET_DOGS = "SET_DOGS";
export const SET_TEMPERAMENT = "SET_TEMPERAMENT";
export const GET_DETAILS = "GET_DETAILS";
export const GET_NAME_DOG = "GET_NAME_DOG";

export function fetchDogs() {
  return async function (dispatch) {
    try {
      var allDogs = await axios.get(`http://localhost:3001/dogs`);
      return dispatch({
        type: SET_DOGS,
        payload: allDogs.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function fetchTemperaments() {
  return async function (dispatch) {
    try {
      var allTemperaments = await axios.get(
        `http://localhost:3001/temperament`
      );
      return dispatch({
        type: SET_TEMPERAMENT,
        payload: allTemperaments.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

export function fetchDogById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: response.data,
      });
    } catch {
      console.log("Try another ID");
    }
  };
}

export function fetchDogByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: GET_NAME_DOG,
        payload: response.data,
      });
    } catch (error) {
      console.error(`Dog not found, try another name`);
    }
  };
}

export function createDog(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/dogs", payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}