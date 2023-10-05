const express = require("express");
const router = express.Router();
const vacinaController = require("../controllers/cargo-controller");

router.get("/", cargoController.getCargo);

module.exports = router;
