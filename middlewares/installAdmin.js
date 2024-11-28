const fs = require("fs").promises;
const path = require("path");

exports.initializeUsers = async (req, res, next) => {
  const defaultAdminUser = {
    uid: 1,
    username: "admin",
    password: "admin123",
    isAdmin: true,
  };

  //procura o diretório data, criando-o se o mesmo não existir
  await fs.mkdir(path.join(__dirname, "../data"), { recursive: true });
  console.log("diretório data inicializado");
  //local onde será aramazenado o json de usuários
  const userjsonpath = path.join(__dirname, "../data", "users.json");

  // verifica a existencia do arquivo e o cria se o mesmo não existir
  try {
    await fs.access(userjsonpath);
    console.log("arquivo de usuario já existe!");
  } catch (error) {
    await fs.writeFile(
      userjsonpath,
      JSON.stringify([defaultAdminUser], null, 2)
    );

    console.log("arquivo de usuario criado");
  }

  next();
};
