const mysql = require("../mysql");

exports.getColaborador = async (req, res) => {
  try {
    const query = "SELECT nome, cpf FROM colaborador";
    const result = await mysql.execute(query);

    if (Array.isArray(result) && result[0]) {
      console.log("Resultados encontrados.");
      const response = result.map((colaborador) => ({
        nome: colaborador.nome,
        cpf: colaborador.cpf,
      }));
      return res.status(200).json(response);
    } else {
      console.log("Nenhum colaborador encontrado.");
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
    const { nome, cpf, cargo_idcargo } = req.body;

    if (!nome || !cpf || !cargo_idcargo) {
      return res.status(400).send({
        error: "Campos 'nome', 'cpf' e 'cargo_idcargo' são obrigatórios.",
      });
    }

    const query =
      "INSERT INTO colaborador (nome, cpf, cargo_idcargo) VALUES (?, ?, ?)";

    try {
      const result = await mysql.execute(query, [nome, cpf, cargo_idcargo]);

      if (result.affectedRows > 0) {
        const novoColaboradorId = result.insertId;
        const response = {
          message: "Usuário criado com sucesso",
          colaborador: {
            id_colaborador: novoColaboradorId,
            nome,
          },
        };
        return res.status(201).send(response);
      } else {
        return res.status(500).send({ message: "Falha ao criar o usuário" });
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
