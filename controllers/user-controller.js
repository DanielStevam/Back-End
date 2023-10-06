const mysql = require("../mysql");

exports.getUser = async (req, res, next) => {
  try {
    const { nome, senha } = req.body;

    const query = "SELECT * FROM usuario WHERE nome = ? AND senha = ?";
    const result = await mysql.query(query, [nome, senha]);
    if (result.length > 0) {
      const response = {
        message: "Login feito com sucesso",
        nome: result[0],
      };
      return res.status(200).send(response);
    } else {
      return res.status(401).send({ message: "Credenciais Inválidas" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
};
