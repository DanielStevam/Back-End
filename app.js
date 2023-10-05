const express = require("express");
const cors = require("cors");
const app = express();

const vacina = require("./routes/vacina");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/vacina", vacina);

module.exports = app;
