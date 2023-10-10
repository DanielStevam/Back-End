const mysql = require("../mysql");

exports.createCargo = async (req, res, next) => {
  try {
    const { nomeCargo, idSetor } = req.body;
    const cargo = await inserirCargo(nomeCargo, idSetor);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

async function inserirCargo(nomeCargo, idSetor) {
  const query = "INSERT INTO cargo (nome,setor_ idsetor) VALUES (?,?)";
  const params = [nomeCargo, idSetor];
  return await mysql.execute(query, params);
}
