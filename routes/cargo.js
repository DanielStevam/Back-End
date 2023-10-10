const express = require("express");
const router = express.Router();
const cargoController = require("../controllers/cargo-controller");

router.post("/cargo", cargoController.createCargo);

module.exports = router;
