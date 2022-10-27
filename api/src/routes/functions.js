const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");

const infoApi = async () => {
  // Uso axios para traer la informacion de la api para luego usarla en el front
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  // Mapeo todos los Dogs y devuelvo el array
  let dogsApi = await apiUrl.data.map((dog) => {
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
  const dogDb = await Dog.findAll();
  dogsApi = [...dogsApi].concat(dogDb);
  return dogsApi;
};

const infoTemperament_DB = async () => {
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
    const allDogs = await infoApi();
    const temperamentDb = await infoTemperament_DB();
    return {
      all_Dogs: allDogs,
      DB_Temperament: temperamentDb,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllDogs };
