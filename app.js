const express = require("express");
const cors = require("cors");
const app = express();

const vacina = require("./routes/vacina");
const colaborador = require("./routes/colaborador");
const user = require("./routes/user");
const cargo = require("./routes/cargo");
const setor = require("./routes/setor");
const exame = require("./routes/exame");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(colaborador);
app.use(user);
app.use(exame);
app.use(vacina);
app.use(setor);
app.use(cargo);

module.exports = app;
