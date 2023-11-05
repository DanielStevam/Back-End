const express = require("express");
const router = express.Router();
const colaboradorController = require("../controllers/colaborador-controller");

router.get("/colaborador", colaboradorController.getColaborador);
router.post("/colaborador", colaboradorController.postColaborador);
router.put("/colaborador", colaboradorController.updateColaborador);
router.delete("/colaborador", colaboradorController.deleteColaborador);

module.exports = router;
