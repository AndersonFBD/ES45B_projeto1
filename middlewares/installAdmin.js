const fs = require("fs").promises;
const path = require("path");

//procura um json de usuários existentes, se não encontrar, um json com um admin default é inicializado em data/users.json.
exports.prepareUser = async (req, res, next) => {
  const defaultAdminUser = {
    uid: 1,
    username: "admin",
    password: "admin123",
    isAdmin: true,
  };

  //local onde será aramazenado o json de usuários
  const userjsonpath = path.join(__dirname, "../data", "users.json");

  try {
    await fs.access(userjsonpath);
    const userData = await fs.readFile(userjsonpath, "utf8");
    console.log("arquivo de usuario já existe!");
  } catch (err) {
    await fs
      .writeFile(userjsonpath, JSON.stringify([defaultAdminUser], null, 2))
      .then(() => {
        console.log("arquivo de usuario criado");
      });
  }
  next();
};
