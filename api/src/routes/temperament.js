const axios = require("axios");
const { Router } = require("express");
const { getAllDogs } = require("./functions");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const temperamentDB = await getAllDogs() ;
    res.json(temperamentDB.DB_Temperament);
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;
