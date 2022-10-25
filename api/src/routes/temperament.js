const { Router } = require("express");
const { Temperament } = require("../db");
const { getAllDogs } = require("./functions");
const router = Router();

router.get("/", async (req, res, next) => {
  // Me traigo todos los Dogs de la api
  const allDogs = await getAllDogs();
  try {
    // Solamente envio los temperamentos
    res.json(allDogs.DB_Temperament);
  } catch (error) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  // Envio el "name" por body e invoco la funcion create del Model de la DB
  const { name } = req.body;
  if (!name) {
    return res.status(400).send(`Bad Request`);
  }
  try {
    const newTemperament = await Temperament.create({ name });
    res.status(201).json(`The temperament ${name} was created successfully`);
  } catch (error) {
    next();
  }
});

module.exports = router;
