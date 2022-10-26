const axios = require("axios");
const { Router } = require("express");
const { Temperament } = require("../db");
const { API_KEY } = process.env;
// const { getAllDogs } = require("./functions");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let temperamentApi = new Set();
    const consultaApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    consultaApi.data.forEach((temp) => {
      let resultTempArray = temp.temperament
        ? temp.temperament.split(", ")
        : [];
      resultTempArray.forEach((temp) => temperamentApi.add(temp));
    });
    const temperamentApiResult = Array.from(temperamentApi);
    temperamentApiResult.forEach(async (e) => {
      await Temperament.findOrCreate({ where: { name: e } });
    });
    const temperamentDB = await Temperament.findAll();
    res.json(temperamentDB);
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;
