const express = require("express");
const bodyParser = require("body-parser");
const { initializeUsers } = require("./middlewares/installAdmin");
const app = express();
const port = process.env.PORT || 3000;

//rotas
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use("/users", userRoutes);

app.get("/install", initializeUsers, (req, res) => {
  res.status(200).end("Admin instalado com sucesso!");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
