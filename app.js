require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const { initializeUsers } = require("./middlewares/installAdmin");
const app = express();
const port = process.env.PORT || 3000;

//rotas
const userRoutes = require("./routes/userRoutes");
const artistRoutes = require("./routes/artistRoutes");
const songRoutes = require("./routes/songRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use("/artists", artistRoutes);
app.use("/songs", songRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/install", initializeUsers, (req, res) => {
  return res.status(200).json("Admin instalado com sucesso!");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
