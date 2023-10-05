const express = require("express");
const router = express.Router();
const vacinaController = require("../controllers/setor-controller");

router.get("/", setorController.getSetor);

module.exports = router;
