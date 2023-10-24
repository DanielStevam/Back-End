const mysql = require("../mysql");

exports.createCargo = async (req, res) => {
  try {
    const { nomeCargo, idSetor } = req.body;
    const cargo = await inserirCargo(nomeCargo, idSetor);
    return res
      .status(200)
      .send({ response: `Cargo ${nomeCargo} cadastrado com sucesso` });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

async function inserirCargo(nomeCargo, idSetor) {
  const query = "INSERT INTO cargo (nome, setor_idsetor) VALUES (?,?)";
  const params = [nomeCargo, idSetor];
  return await mysql.execute(query, params);
}

exports.getCargo = async (req, res) => {
  try {
    const queryAll =
      "SELECT cargo.nome as nomeCargo, setor.nome as nomeSetor FROM cargo inner join setor on cargo.setor_idsetor = setor.idsetor";
    const result = await mysql.execute(queryAll);
    if (result.length > 0) {
      console.log(result);
      const response = {
        message: "Success",
        cargos: result.map((cargo) => {
          return {
            id_cargo: cargo.idcargo,
            nomeCargo: cargo.nomeCargo,
            nomeSetor: cargo.nomeSetor,
          };
        }),
      };
      return res.status(200).send(response);
    } else {
      return res.status(404).send({ message: "Nenhum cargo encontrado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
};

exports.updateCargo = async (req, res) => {
  try {
    const { nomeCargo, idSetor, idcargo } = req.body;
    const query =
      "UPDATE cargo SET nome = ?, setor_idsetor = ? WHERE idcargo = ?;";
    const params = [nomeCargo, idSetor, idcargo];
    await mysql.execute(query, params);
    // todo: valide se as linhas foram afetadas. Exemplo acima em result.lenght > 0

    return res
      .status(200)
      .send({ response: `Cargo de id ${idcargo} atualizado com sucesso` });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
};

exports.deleteCargo = async (req, res) => {
  try {
    const { idcargo } = req.params;
    const query = "delete from cargo WHERE idcargo = ?;";
    const params = [idcargo];
    await mysql.execute(query, params);
    // todo: valide se as linhas foram afetadas. Exemplo acima em result.lenght > 0

    return res
      .status(200)
      .send({ response: `Cargo de id ${idcargo} DELETADO com sucesso` });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
};
