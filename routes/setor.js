const express = require("express");
const router = express.Router();
const setorController = require("../controllers/setor-controller");

router.get("/setor", setorController.getSetor);

module.exports = router;
