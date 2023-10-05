const express = require("express");
const router = express.Router();
const vacinaController = require("../controllers/user-controller");

router.get("/", userController.getUser);

module.exports = router;
