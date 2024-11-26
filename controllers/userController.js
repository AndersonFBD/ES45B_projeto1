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

  res.status(201).json(user);
};

exports.editUser = async (req, res) => {
  const user = await userService.editUser(Number(req.params.id), req.body);

  if (!user) {
    res
      .status(404)
      .json({ erro: "o usuario especificado não pôde ser encontrado" });
  }

  res.status(200).json(user);
};

exports.deleteUser = async (req, res) => {
  const deletedUser = await userService.removeUser(Number(req.params.id));

  if (!deletedUser) {
    res
      .status(404)
      .json({ erro: "o usuario especificado não pôde ser encontrado" });
  }
};
