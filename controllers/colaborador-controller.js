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
          message: "Colaborador criado com sucesso",
          colaborador: {
            id_colaborador: novoColaboradorId,
            nome,
          },
        };
        return res.status(201).send(response);
      } else {
        return res
          .status(500)
          .send({ message: "Falha ao criar o colaborador" });
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
exports.updateColaborador = async (req, res) => {
  try {
    const { id_colaborador, nome, cpf, cargo_idcargo } = req.body;

    if (!id_colaborador || !nome || !cpf || !cargo_idcargo) {
      return res.status(400).send({
        error:
          "Campos 'id_colaborador', 'nome', 'cpf' e 'cargo_idcargo' são obrigatórios.",
      });
    }

    const query =
      "UPDATE colaborador SET nome = ?, cpf = ?, cargo_idcargo = ? WHERE id_colaborador = ?";

    try {
      const result = await mysql.execute(query, [
        nome,
        cpf,
        cargo_idcargo,
        id_colaborador,
      ]);

      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send({ message: "Colaborador atualizado com sucesso" });
      } else {
        return res.status(404).send({ error: "Colaborador não encontrado" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ error: "Erro interno ao atualizar o colaborador" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
};

exports.deleteColaborador = async (req, res) => {
  try {
    const { id_colaborador } = req.body;

    if (!id_colaborador) {
      return res.status(400).send({
        error: "O campo 'id_colaborador' é obrigatório.",
      });
    }

    const query = "DELETE FROM colaborador WHERE id_colaborador = ?";

    try {
      const result = await mysql.execute(query, [id_colaborador]);

      if (result.affectedRows > 0) {
        return res
          .status(200)
          .send({ message: "Colaborador excluído com sucesso" });
      } else {
        return res.status(404).send({ error: "Colaborador não encontrado" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ error: "Erro interno ao excluir o colaborador" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
};
