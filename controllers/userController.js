const userService = require("../services/userServices");

exports.listAllUsers = async (req, res) => {
  console.log(req.admin);
  if (req.admin == false)
    return res.status(403).json("sem privilégios para essa rota");
  else {
    let page = Number(req.query.page[0]);
    let limit = Number(req.query.limit[0]);
    if (limit !== 5 && limit !== 10 && limit !== 30)
      return res.status(400).json({ error: "o limite deve ser 5, 10 ou 30" });
    const userList = await userService.findAllUsers(page, limit);
    return res.status(200).json(userList);
  }
};

exports.findUser = async (req, res) => {
  if (req.admin === false)
    return res.status(403).json("sem privilégios para essa rota");

  const user = await userService.findUserById(Number(req.params.id));

  if (!user) {
    return res
      .status(404)
      .json({ erro: "o usuario especificado não pôde ser encontrado" });
  }

  return res.status(200).json(user);
};

exports.viewMyProfile = async (req, res) => {
  const user = await userService.findUserById(Number(req.uid));

  if (!user) {
    return res
      .status(404)
      .json({ erro: "o usuario especificado não pôde ser encontrado" });
  }

  return res.status(200).json(user);
};

exports.createUser = async (req, res) => {
  await userService.addUser(req.body);
  return res.status(201).json(req.body);
};

// apenas admins podem editar outros usuários
// o primeiro usuario não pode ser alterado
exports.editUser = async (req, res) => {
  if (req.admin === true) {
    if (req.params.uid == 1)
      return res.status(405).json("este usuário não pode ser editado");

    const user = await userService.editUser(req.params.uid, req.body);
    if (!user) {
      res
        .status(404)
        .json({ erro: "o usuario especificado não pôde ser encontrado" });
    } else {
      return res.status(200).json(user);
    }
  } else {
    return res.status(403).json("sem privilégios o suficiente");
  }
};

exports.editMyProfile = async (req, res) => {
  if (req.body.isAdmin) req.body.isAdmin = false; //medida de segurança para evitar que usuarios comuns se tornem admins
  await userService.editUser(req.uid, req.body);
  return res.status(200).json("alterações salvas");
};

//apenas admins podem deletar usuários
exports.deleteUser = async (req, res) => {
  if (req.admin === false) {
    return res.status(403).json("você não tem permissões de acesso");
  }
  if (req.params.uid == 1) {
    return res.status(405).json("comando não permitido para este usuario");
  } else {
    const deletedUser = await userService.removeUser(req.params.uid);

    if (!deletedUser) {
      res
        .status(404)
        .json({ erro: "o usuario especificado não pôde ser encontrado" });
    } else {
      return res.status(200).json({ "removed user": deletedUser });
    }
  }
};

exports.login = async (req, res) => {
  const login = await userService.login({
    username: req.body.username,
    password: req.body.password,
  });
  if (login.auth) {
    return res.status(200).json({ status: "bem-vindo de volta" });
  } else {
    console.log(process.env.TOKEN_EXPIRATION);
    console.error(login.error);
    return res.status(401).json({ error: "credenciais inválidas" });
  }
};

exports.logout = async (req, res) => {
  await userService.logout();
  return res.status(200).json({ message: "sessão encerrada" });
};

exports.addNewAdmin = async (req, res) => {
  if (req.admin === false) {
    return res.status(403).json("acesso negado");
  } else {
    await userService.createAdmin(req.body);
    return res.status(201).json("nova credencial admin criada com êxito");
  }
};
