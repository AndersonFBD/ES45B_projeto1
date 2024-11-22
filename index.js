const express = require("express");
const bodyParser = require("body-parser");
const { initializeUsers } = require("./middlewares/installAdmin");
const app = express();
const port = 3000;

app.get("/install", initializeUsers, (req, res) => {
  res.status(200).end("Admin instalado com sucesso!");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
