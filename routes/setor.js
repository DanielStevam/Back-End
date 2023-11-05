const express = require("express");
const router = express.Router();
const setorController = require("../controllers/setor-controller");

router.get("/setor", setorController.getAll);
router.post("/setor", setorController.createSetor);
router.put("/setor", setorController.updateSetor);
router.delete("/setor", setorController.deleteSetor);

module.exports = router;
