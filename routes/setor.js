const express = require("express");
const router = express.Router();
const setorController = require("../controllers/setor-controller");

router.get("/setor", setorController.getAll);

module.exports = router;
