const express = require("express");
const router = express.Router();
const vacinaController = require("../controllers/colaborador-controller");

router.get("/", colaboradorController.getColaborador);

module.exports = router;
