const { Router } = require("express");
const { getAllDogs } = require("./functions");
const { Dog } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    // Llama a la funcion GetAllDogs que trae todos los perros
    const allDogs = await getAllDogs();
    res.status(200).json(allDogs);
  } catch (error) {
    next();
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const idDog = await getAllDogs(); // trae todos los perros
    // Primero busca el perro en la API
    const filterDogApi = await idDog.Api_Dogs.find(
      (dog) => dog.id === Number(id)
    );
    // Luego busca el perro en la base de datos
    const filterDogDB = await idDog.DB_Dogs.find(
      (dog) => dog.id === Number(id)
    );
    // Dependiendo de donde encuentre el perro manda el correspondiente en formato json
    if (filterDogApi) {
      res.status(200).json(filterDogApi);
    }
    if (filterDogDB) {
      res.status(200).json(filterDogDB);
    }
    // Si no encuentra el perro envia un 404 con un texto diciendo que el perro no existe
    res.status(404).send(`Dog doesn't exist`);
  } catch (error) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  // const { id, name, height, weight, life_span, breed_group, image } = req.body;
});

module.exports = router;
