const { Router } = require("express");
const { getAllDogs } = require("./functions");
const { Dog } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    // Llama a la funcion GetAllDogs que trae todos los perros
    const { all_Dogs } = await getAllDogs();

    if (name) {
      const dogFilter = await all_Dogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      dogFilter.length > 0
        ? res.status(200).send(dogFilter)
        : res.status(404).send(`Dog not found`);
    } else {
      return res.status(200).json(all_Dogs);
    }
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
  const {
    name,
    maxHeight,
    minHeight,
    minWeight,
    maxWeight,
    life_span,
    image,
    temperaments,
  } = req.body;
  if (!name || !maxHeight || !minHeight || !minWeight || !maxWeight) {
    return res.status(400).send(`Bad Request`);
  }
  if (temperaments?.length === 0)
    return res.json({ error: `Temperaments is required` });

  try {
    const newDog = await Dog.create({
      name: name.toString(),
      maxHeight: maxHeight.toString(),
      minHeight: minHeight.toString(),
      minWeight: minWeight.toString(),
      maxWeight: maxWeight.toString(),
      life_span: life_span.toString(),
      image: image.toString(),
    });
    newDog.addTemperament(temperaments);
    return res.status(201).send(`The dog was created successfully`);
  } catch (error) {
    next();
  }
});

module.exports = router;
