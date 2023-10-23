const mysql = require("../mysql");

exports.getColaborador = async (req, res, next) => {
  try {
    const query = "SELECT nome, cpf FROM colaborador";
    const [result] = await mysql.execute(query);

    if (result && result.length > 0) {
      const response = result.map((colaborador) => ({
        nome: colaborador.nome,
        cpf: colaborador.cpf,
      }));

      return res.status(200).json(response);
    } else {
      return res.status(404).json({ error: "Nenhum colaborador encontrado" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erro interno ao consultar o banco de dados" });
  }
};

exports.postColaborador = async (req, res, next) => {
  try {
    const { nome, cpf } = req.body;
    const query = "SELECT * FROM colaborador WHERE nome = ? AND cpf = ?";

    try {
      const [result] = await mysql.execute(query, [nome, cpf]);

      if (result && result.length > 0) {
        const colaborador = result[0];
        const response = {
          message: "Login feito com sucesso",
          colaborador: {
            id_colaborador: colaborador.id_colaborador,
            nome: colaborador.nome,
          },
        };
        return res.status(200).send(response);
      } else {
        return res.status(401).send({ message: "Credenciais Inválidas" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ error: "Erro interno ao consultar o banco de dados" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
};
