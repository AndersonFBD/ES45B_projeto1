const userService = require("../services/userSerices");

exports.listAllUsers = (req, res) => {
  const userList = userService.listAllUsers();
  res.status(200).json(userList);
};

exports.findUser = (req, res) => {
  const user = userService.findUserById(Number(req.params.id));

  if (!user) {
    res
      .status(404)
      .json({ erro: "o usuario especificado não pôde ser encontrado" });
  }

  res.status(200).json(user);
};

exports.createUser = (req, res) => {
  const user = userService.createUser(req.body);

  res.status(201).json(user);
};

exports.editUser = (req, res) => {
  const user = userService.updateUser(Number(req.params.id), req.body);

  if (!user) {
    res
      .status(404)
      .json({ erro: "o usuario especificado não pôde ser encontrado" });
  }

  res.status(200).json(user);
};

exports.deleteUser = (req, res) => {
  const deletedUser = userService.deleteUser(Number(req.params.id));

  if (!deletedUser) {
    res
      .status(404)
      .json({ erro: "o usuario especificado não pôde ser encontrado" });
  }
};
