const mysql = require("../mysql");

exports.getAll = async (req, res, next) => {
  try {
    const queryAll = "SELECT * FROM setor";
    const result = await mysql.execute(queryAll);
    if (result.length > 0) {
      const response = {
        message: "Success",
        setor: result.map((setor) => {
          return {
            id_setor: setor.idsetor,
            nome_setor: setor.nome,
          };
        }),
      };
      return res.status(200).send(response);
    } else {
      return res.status(401).send({ message: "Setor Inválido" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Erro do servidor" });
  }
};
