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
    const filterDog = await idDog.all_Dogs.find((dog) => dog.id == id);
    if (filterDog) {
      return res.status(200).json(filterDog);
    }
    // Si no encuentra el perro envia un 404 con un texto diciendo que el perro no existe
    return res.status(404).send(`Dog doesn't exist`);
  } catch (error) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  const { name, height, weight, life_span, breed_group, image } = req.body;
  if (!name || !height || !weight) {
    return res.status(400).send(`Bad Request`);
  }
  try {
    const newDog = await Dog.create({
      name: name.toString(),
      height: height.toString(),
      weight: weight.toString(),
      life_span: life_span.toString(),
      breed_group: breed_group.toString(),
      image: image.toString(),
    });
    return res.status(201).send(`The dog was created successfully`);
  } catch (error) {
    next();
  }
});

module.exports = router;
