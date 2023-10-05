const express = require("express");
const cors = require("cors");
const app = express();

const vacina = require("./routes/vacina");
const colaborador = require("./routes/colaborador");
const user = require("./routes/user");

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

module.exports = app;
