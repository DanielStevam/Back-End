const express = require("express");
const router = express.Router();
const vacinaController = require("../controllers/vacina-controller");

router.get("/", vacinaController.getVacina);

module.exports = router;
