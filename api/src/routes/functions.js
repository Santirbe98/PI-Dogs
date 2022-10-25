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

// Con el FindAll traigo todos los "Dog" que hayan sido ingresados mediante el formulario, en caso de que falle tiro el error con su mensaje
const infoDog_DB = async () => {
  try {
    const dogDb = await Dog.findAll();
    return dogDb;
  } catch (error) {
    throw new Error(error);
  }
};

// Lo mismo que la funcion infoDog_DB pero con temperament
const infoTemperament_DB = async () => {
  //   // Filtro solamente los dogs que tiene la propiedad temperament
  //   const dogsWithTemperament = allDogs.Api_Dogs.filter((t) => t.temperament);
  //   // Hago un split por cada propiedad temperament de Dog
  //   const temperamentArraymap = dogsWithTemperament.map((t) =>
  //     t.temperament.split(", ")
  //   );
  //   // Creo un nuevo array para guardar todos los temperamentos por separado
  //   const arrayTemperament = [];
  //   // El for lo que hace es pushear todos los elementos y convertirlos en un solo array
  //   for (let i = 0; i < temperamentArraymap.length; i++) {
  //     for (let j = 0; j < temperamentArraymap[i].length; j++) {
  //       if (!(arrayTemperament[i] === temperamentArraymap[i][j])) {
  //         arrayTemperament.push(temperamentArraymap[i][j]);
  //       }
  //     }
  //   }
  //   // la funcion reductora para eliminar datos repetidos
  //   const resultArray = arrayTemperament.reduce((a, e) => {
  //     if (!a.find((d) => d == e)) {
  //       a.push(e);
  //     }
  //     return a;
  //   }, []);

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
