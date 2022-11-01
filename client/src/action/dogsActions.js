import axios from "axios";
export const SET_DOGS = "dogs/set";
export const SET_TEMPERAMENT = "temperament/set";
export const GET_DETAILS = "dogs/get/id";

export function setDogs(value) {
  return {
    type: SET_DOGS,
    payload: value,
  };
}

export function setTemperaments(value) {
  return {
    type: SET_TEMPERAMENT,
    payload: value,
  };
}

export function fetchDogs() {
  return async function (dispatch) {
    try {
      var allDogs = await axios.get(`http://localhost:3001/dogs`);
      return dispatch({
        type: SET_DOGS,
        payload: allDogs.data.all_Dogs,
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
