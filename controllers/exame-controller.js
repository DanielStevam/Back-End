const mysql = require("../mysql");

exports.getExame = async (req, res, next) => {
  try {
    const response = {
      message: "success exame",
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};
