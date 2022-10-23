const { Router } = require("express");
const { Dog } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {});

router.get("/:id", async (req, res, next) => {});

router.post("/", async (req, res, next) => {});

module.exports = router;
