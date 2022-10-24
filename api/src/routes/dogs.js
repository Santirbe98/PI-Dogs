const { Router } = require("express");
const { getAllDogs } = require("./functions");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const allDogs = await getAllDogs();
    res.status(200).json(allDogs);
  } catch (error) {
    res.status(500).send(`Internal server Error`);
  }
});

router.get("/:id", async (req, res, next) => {});

router.post("/", async (req, res, next) => {});

module.exports = router;
