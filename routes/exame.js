const express = require("express");
const router = express.Router();
const exameController = require("../controllers/exame-controller");

router.get("/exame", exameController.getExame);

module.exports = router;
