const userService = require("../services/userServices");

exports.listAllUsers = async (req, res) => {
  // console.log("olá " + req.user);
  // req.admin
  // ? console.log("você é um admin")
  // : console.log("você é um usuário comum");
  const userList = await userService.findAllUsers();
  res.status(200).json(userList);
};

// requer verificação das funções
exports.findUser = async (req, res) => {
  const user = await userService.findUserById(Number(req.params.id));

  if (!user) {
    res
      .status(404)
      .json({ erro: "o usuario especificado não pôde ser encontrado" });
  }

  res.status(200).json(user);
};

exports.createUser = async (req, res) => {
  const user = await userService.addUser(req.body);
  console.log(req.body);
  res.status(201).json(req.body);
};

exports.editUser = async (req, res) => {
  const user = await userService.editUser(req.params.uid, req.body);
  if (!user) {
    res
      .status(404)
      .json({ erro: "o usuario especificado não pôde ser encontrado" });
  } else {
    res.status(200).json(user);
  }
};

exports.deleteUser = async (req, res) => {
  const deletedUser = await userService.removeUser(req.params.uid);

  if (!deletedUser) {
    res
      .status(404)
      .json({ erro: "o usuario especificado não pôde ser encontrado" });
  } else {
    res.status(200).json({ "removed user": deletedUser });
  }
};

exports.login = async (req, res) => {
  const login = await userService.login({
    username: req.body.username,
    password: req.body.password,
  });
  if (login.auth) {
    res.status(200).json({ status: "bem-vindo de volta" });
  } else {
    console.log(process.env.TOKEN_EXPIRATION);
    console.error(login.error);
    res.status(401).json({ error: "credenciais inválidas" });
  }
};

exports.logout = async (req, res) => {
  await userService.logout();
  res.status(200).json({ message: "sessão encerrada" });
};
