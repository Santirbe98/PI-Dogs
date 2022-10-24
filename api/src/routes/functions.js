const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");

const infoApi = async () => {
  // Uso axios para traer la informacion de la api para luego usarla en el front
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  // Mapeo todos los Dogs y devuelvo el array
  const dogsApi = await apiUrl.data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      breed_group: dog.breed_group,
      life_span: dog.life_span,
      temperament: dog.temperament,
      weight: dog.weight.metric,
      height: dog.height.metric,
      image: dog.image.url,
    };
  });
  return dogsApi;
};

const infoDog_DB = async () => {
  // Con el FindAll traigo todos los "Dog" que hayan sido ingresados mediante el formulario, en caso de que falle tiro el error con su mensaje
  try {
    const dogDb = await Dog.findAll();
    return dogDb;
  } catch (error) {
    throw new Error(error);
  }
};

const infoTemperament_DB = async () => {
  // Lo mismo que la funcion infoDog_DB pero con temperament
  try {
    const temperamentDb = await Temperament.findAll();
    return temperamentDb;
  } catch (error) {
    console.log(error);
  }
};

// Con esta funcion devuelvo un objeto con todos los dogs de la api y de la base de datos.
const getAllDogs = async () => {
  try {
    const apiDogs = await infoApi();
    const dogsDb = await infoDog_DB();
    const temperamentDb = await infoTemperament_DB();
    return {
      DB_Dogs: dogsDb,
      DB_Temperament: temperamentDb,
      Api_Dogs: apiDogs,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllDogs };
