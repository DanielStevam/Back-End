const mysql = require("../mysql");

exports.getVacina = async (req, res, next) => {
  try {
    const response = {
      message: "success vacina",
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
