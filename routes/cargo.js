const express = require("express");
const router = express.Router();
const cargoController = require("../controllers/cargo-controller");

router.get("/cargo", cargoController.getCargo);

module.exports = router;
