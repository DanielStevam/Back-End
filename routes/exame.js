const express = require("express");
const router = express.Router();
const vacinaController = require("../controllers/exame-controller");

router.get("/", exameController.getExame);

module.exports = router;
