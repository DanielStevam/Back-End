const mysql = require("../mysql");

exports.getAll = async (req, res) => {
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
exports.createSetor = async (req, res) => {
  try {
    const { nome, cargo_id } = req.body;

    if (!nome || !cargo_id) {
      return res
        .status(400)
        .send({ error: "Os campos 'nome' e 'cargo_id' são obrigatórios." });
    }

    const setorQuery = "INSERT INTO setor (nome) VALUES (?)";
    const setorParams = [nome];
    const setorResult = await mysql.execute(setorQuery, setorParams);

    if (setorResult.affectedRows > 0) {
      const newSetorId = setorResult.insertId;

      const colaboradorQuery =
        "INSERT INTO colaboradores (cargo_id, nome) VALUES (?, ?)";
      const colaboradorParams = [cargo_id, nome];
      const colaboradorResult = await mysql.execute(
        colaboradorQuery,
        colaboradorParams
      );

      if (colaboradorResult.affectedRows > 0) {
        return res.status(201).send({
          message:
            "Setor criado com sucesso e associado a um cargo de colaborador",
          setor: {
            id_setor: newSetorId,
            nome_setor: nome,
          },
        });
      } else {
        return res
          .status(500)
          .send({
            error:
              "Falha ao criar o setor ou associá-lo ao cargo de colaborador",
          });
      }
    } else {
      return res.status(500).send({ error: "Falha ao criar o setor" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Erro do servidor" });
  }
};

exports.updateSetor = async (req, res) => {
  try {
    const { nome, idsetor } = req.body;
    const query = "UPDATE cargo SET nome = ? WHERE idsetor = ?;";
    const params = [nome, idsetor];
    await mysql.execute(query, params);
    // todo: valide se as linhas foram afetadas. Exemplo acima em result.lenght > 0

    return res
      .status(200)
      .send({ response: `Setor de id ${idsetor} atualizado com sucesso` });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
};
exports.deleteSetor = async (req, res) => {
  try {
    const { idsetor } = req.params;
    const query = "delete from setor WHERE idsetor = ?;";
    const params = [idsetor];
    await mysql.execute(query, params);
    // todo: valide se as linhas foram afetadas. Exemplo acima em result.lenght > 0

    return res
      .status(200)
      .send({ response: `Setor de id ${idsetor} DELETADO com sucesso` });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
};
