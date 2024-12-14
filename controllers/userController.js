const userService = require("../services/userServices");

exports.listAllUsers = async (req, res) => {
  console.log(req.admin);
  if (req.admin == false)
    return res.status(403).json("sem privilégios para essa rota");
  else {
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    if (limit !== 5 && limit !== 10 && limit !== 30)
      return res.status(400).json({ error: "o limite deve ser 5, 10 ou 30" });
    const userList = await userService.findAllUsers(page, limit);
    return res.status(200).json(userList);
  }
  /*
  #swagger.tags = ['usuários']
  #swagger.summary = 'realiza a listagem de todos os usuários em páginas'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.description = 'A rota retorna todos os usuários conforme 
  definido página e limite nos parametros, apenas administradores
   podem acessar esta rota'
  #swagger.parameters['page'] =
    {
      in: "query",
      description: "numero da pagina",
      required: true,
      type: "integer",
    }
  #swagger.parameters['limit'] =     {
      in: "query",
      description: "limite de itens por pagina",
      required: true,
      type: "integer"
    }
    #swagger.responses[200] = {
    description: 'exibe os usuarios da página especificada',
    content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/user'
          }
        }
      }
    }
  }

  #swagger.responses[400] = {
    description: 'limite invalido',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'limite invalido, precisa ser 5 , 10 ou 30'}
          }
        }
      }
    }
  }

  #swagger.responses[401] = {
    description: 'sessão expirada ou inexistente',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'sem permissão, efetue login para acessar'}
          }
        }
      }
    }
  }
    #swagger.responses[403] = {
    description: 'sem privilégios',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'sem privilégios para essa rota'}
          }
        }
      }
    }
  }
  */
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

  /*
  #swagger.tags = ['usuários']
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.summary = 'realiza a busca de usuários pela id'
  #swagger.description = 'A rota retorna o usuário com a id
  fornecida na URL. Essa rota só pode ser acessada por administradores'
  #swagger.parameters['id'] =
    {
      in: "path",
      description: "id do usuário",
      required: true,
      type: "integer",
    }
    #swagger.responses[200] = {
    description: 'usuário encontrado:',
    content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/user'
          }
        }
      }
    }
  }
      #swagger.responses[401] = {
    description: 'sessão expirada ou inexistente',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'sem permissão, efetue login para acessar'}
          }
        }
      }
    }
  }
    #swagger.responses[403] = {
    description: 'sem privilégios',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'sem privilégios para essa rota'}
          }
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: 'usuário não encontrado',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'nenhum usuário encontrado com a id especificada'}
          }
        }
      }
    }
  }
  */
};

exports.viewMyProfile = async (req, res) => {
  const user = await userService.findUserById(Number(req.uid));

  if (!user) {
    return res
      .status(404)
      .json({ erro: "o usuario especificado não pôde ser encontrado" });
  }

  return res.status(200).json(user);
  /*
    #swagger.tags = ['usuários']
    #swagger.summary = 'exibe as informações do usuário logado'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.description = 'permite visualizar as informações de perfil se o usuário estiver logado'
    #swagger.responses[401] = {
    description: 'sessão expirada ou inexistente',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'sem permissão, efetue login para acessar'}
          }
        }
      }
    }
  }
    #swagger.responses[200] = {
    description: 'usuário encontrado:',
    content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/user'
          }
        }
      }
    }
  }
    #swagger.responses[404] = {
    description: 'usuário não encontrado',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'nenhum usuário encontrado com a id especificada'}
          }
        }
      }
    }
  }
  */
};

exports.createUser = async (req, res) => {
  await userService.addUser(req.body);
  return res.status(201).json(req.body);
  /*
  #swagger.tags = ['usuários']
  #swagger.summary = 'cadastro de usuários'
  #swagger.description = 'rota usada para criar contas novas de usuários'
    #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/user"
        },
        examples:{
          "new user": {
            "value": {
              "username": "testedecadastro",
              "password": "testando123",
            }
          }
        }
      }
    }
  }
  #swagger.responses[201] = {
      description: 'usuario cadastrado com sucesso.',
      content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/user'
          }
        }
      }
    }
  }
    #swagger.responses[400] = {
    description: 'erro no formato da requisição',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'houve um erro com os dados enviados'}
          }
        }
      }
    }
  }
  */
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
  /*
    #swagger.tags = ['usuários']
    #swagger.summary = 'atualização de usuários'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.description = 'rota usada para atualizar um usuário'
    #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/user"
        },
        examples:{
          "usuario": {
            "value": {
              "username": "updateduser",
              "password": "testupdate123",
            }
          }
        }
      }
    }
  }
    #swagger.responses[200] = {
      description: 'usuario atualizado com sucesso.',
      content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/user'
          }
        }
      }
    }
  }
     #swagger.responses[400] = {
    description: 'erro no formato da requisição',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'houve um erro com os dados enviados'}
          }
        }
      }
    }
  }
     #swagger.responses[401] = {
    description: 'sessão expirada ou inexistente',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'sem permissão, efetue login para acessar'}
          }
        }
      }
    }
  }
    #swagger.responses[403] = {
    description: 'sem privilégios',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'sem privilégios para essa rota'}
          }
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: 'usuário não encontrado',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'nenhum usuário encontrado com a id especificada'}
          }
        }
      }
    }
  }
    #swagger.responses[405] = {
    description: 'alteração de usuario root negada',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'este usuário não pode ser alterado'}
          }
        }
      }
    }
  }
  */
};

exports.editMyProfile = async (req, res) => {
  if (req.uid == 1)
    return res.status(405).json("este usuário não pode ser editado");
  if (req.body.isAdmin) req.body.isAdmin = false; //medida de segurança para evitar que usuarios comuns se tornem admins
  await userService.editUser(req.uid, req.body);
  return res.status(200).json("alterações salvas");
  /*
    #swagger.tags = ['usuários']
    #swagger.summary = 'atualização de usuários'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.description = 'rota usada para um usuário atualizar seus dados'
    #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/user"
        },
        examples:{
          "usuario": {
            "value": {
              "username": "updateduser",
              "password": "testupdate123",
              "isAdmin": false,
            }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
      description: 'usuario atualizado com sucesso.',
      content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/user'
          }
        }
      }
    }
  }
     #swagger.responses[400] = {
    description: 'erro no formato da requisição',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'houve um erro com os dados enviados'}
          }
        }
      }
    }
  }
     #swagger.responses[401] = {
    description: 'sessão expirada ou inexistente',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'sem permissão, efetue login para acessar'}
          }
        }
      }
    }
  }
    #swagger.responses[405] = {
    description: 'alteração de usuario root negada',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'este usuário não pode ser alterado'}
          }
        }
      }
    }
  }
   */
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
  /*
  #swagger.tags = ['usuários']
  #swagger.summary = 'deletar um usuário'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.description = 'rota usada para deletar a conta de um usuário'
  #swagger.responses[200] = {
      description: 'usuario removido com sucesso.',
      content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/user'
          }
        }
      }
    }
  }
     #swagger.responses[401] = {
    description: 'sessão expirada ou inexistente',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'sem permissão, efetue login para acessar'}
          }
        }
      }
    }
  }
    #swagger.responses[403] = {
    description: 'sem privilégios',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'sem privilégios para essa rota'}
          }
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: 'usuário não encontrado',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'nenhum usuário encontrado com a id especificada'}
          }
        }
      }
    }
  }
    #swagger.responses[405] = {
    description: 'remoção de usuario root negada',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'este usuário não pode ser apagado'}
          }
        }
      }
    }
  }
  */
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
  /*
  #swagger.tags = ['login/logout']
  #swagger.summary = 'login de usuários'
  #swagger.description = 'A rota realiza a autênticação de usuários cadastrados'
  */
};

exports.logout = async (req, res) => {
  await userService.logout();
  return res.status(200).json({ message: "sessão encerrada" });
  /*
  #swagger.tags = ['login/logout']
  #swagger.summary = 'logout de usuários'
  #swagger.description = 'A rota realiza o encerramento da sessão de usuários cadastrados'
  */
};

exports.addNewAdmin = async (req, res) => {
  if (req.admin === false) {
    return res.status(403).json("acesso negado");
  } else {
    await userService.createAdmin(req.body);
    return res.status(201).json("nova credencial admin criada com êxito");
  }
  /*
    #swagger.tags = ['usuários']
    #swagger.summary = 'cadastro de admins'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.description = 'rota usada para criar contas administrativas'
    #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/user"
        },
        examples:{
          "new user": {
            "value": {
              "username": "admintest",
              "password": "admintest123",
            }
          }
        }
      }
    }
  }
  #swagger.responses[201] = {
      description: 'admin cadastrado com sucesso.',
      content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/user'
          }
        }
      }
    }
  }
    #swagger.responses[400] = {
    description: 'erro no formato da requisição',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'houve um erro com os dados enviados'}
          }
        }
      }
    }
  } #swagger.responses[401] = {
    description: 'sessão expirada ou inexistente',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'sem permissão, efetue login para acessar'}
          }
        }
      }
    }
  }
    #swagger.responses[403] = {
    description: 'sem privilégios',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'sem privilégios para essa rota'}
          }
        }
      }
    }
  }
  */
};
