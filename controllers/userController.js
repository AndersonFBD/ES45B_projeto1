const userService = require("../services/userServices");

exports.listAllUsers = async (req, res) => {
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
