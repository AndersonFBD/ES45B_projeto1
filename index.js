const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const port = 3000;

//procura um json de usuários existentes, se não encontrar, um json com um admin default é inicializado em data/users.json.
const prepareUser = async () => {
  const defaultAdminUser = {
    username: "admin",
    password: "admin123",
    isAdmin: true,
  };

  //local onde será aramazenado o json de usuários
  const userjsonpath = path.join(__dirname, "data", "users.json");

  try {
    await fs.access(userjsonpath);
    const userData = await fs.readFile(userjsonpath, "utf8");
    console.log("arquivo de usuario encontrado!");
  } catch (err) {
    await fs.mkdir(path.dirname(userjsonpath), { recursive: true });

    await fs
      .writeFile(userjsonpath, JSON.stringify([defaultAdminUser], null, 2))
      .then(() => {
        console.log("arquivo de usuario criado");
      });
  }
};

app.listen(port, async () => {
  await prepareUser();
  console.log("listening on port " + port);
});
