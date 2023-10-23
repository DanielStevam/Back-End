const express = require("express");
const router = express.Router();
const cargoController = require("../controllers/cargo-controller");

router.post("/cargo", cargoController.createCargo);
router.put("/cargo", cargoController.updateCargo);
router.get("/cargo", cargoController.getCargo);
router.delete("/cargo/:idcargo", cargoController.deleteCargo);
module.exports = router;
