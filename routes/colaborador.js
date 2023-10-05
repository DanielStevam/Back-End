const express = require("express");
const router = express.Router();
const vacinaController = require("../controllers/colaborador-controller");

router.get("/colaborador", (req, res, next) => {
  try {
    const response = {
      message: "success colaborador",
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
});
module.exports = router;
