const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsMiddleware = require("./dogs");
const temperamentMiddleware = require("./temperament");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogsMiddleware);
router.use("/temperament", temperamentMiddleware);

module.exports = router;
