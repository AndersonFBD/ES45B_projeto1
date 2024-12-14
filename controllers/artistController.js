const artistServices = require("../services/artistServices");

exports.getAll = async (req, res) => {
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);
  if (limit !== 5 && limit !== 10 && limit !== 30 && !limit)
    return res.status(400).json({ error: "o limite deve ser 5, 10 ou 30" });
  const AllArtists = await artistServices.getAllArtists(page, limit);
  res.status(200).json(AllArtists);
  /*
  #swagger.tags = ['artistas']
  #swagger.summary = 'realiza a listagem dos artistas por paginas'
  #swagger.description = 'A rota retorna todos os artistas conforme definido página e limite nos parametros'
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
    description: 'artistas dessa página:',
    content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/artist'
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'limite invalido, precisa ser 5 , 10 ou 30',
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
  */
};

exports.findOneArtist = async (req, res) => {
  const artist = await artistServices.getArtist(Number(req.params.id));

  if (!artist) {
    res
      .status(404)
      .json({ erro: "nenhum artista encontrado com a id especificada" });
  }

  res.status(200).json(artist);
  /*
  #swagger.tags = ['artistas']
  #swagger.summary = 'realiza a busca do artista pela id'
  #swagger.description = 'A rota retorna o artista conforme definido a id na URL'
  #swagger.parameters['id'] =
    {
      in: "path",
      description: "id do artista",
      required: true,
      type: "integer",
    }
    #swagger.responses[200] = {
    description: 'artista encontrado:',
    content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/artist'
          }
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: 'artista não encontrado',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'nenhum artista encontrado com a id especificada'}
          }
        }
      }
    }
  }
  */
};

exports.addArtist = async (req, res) => {
  await artistServices.addNewArtist(req.body);
  console.log(req.body);
  res.status(201).json({ "artista adicionado": req.body });
  /*
  #swagger.tags = ['artistas']
  #swagger.summary = 'adição de artistas'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.description = 'rota usada para cadastrar artistas na base de dados'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/artist"
        },
        examples:{
          "artist": {
            "value": {
              "name": "name of artist",
              "genre": "genre of artist",
            }
          }
        }
      }
    }
  } #swagger.responses[201] = {
      description: 'artista adicionado com sucesso.',
      content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/artist'
          }
        }
      }
    }
  }
    #swagger.responses[400] = {
    description: 'artista não adicionado',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'houve um erro com o artista enviado'}
          }
        }
      }
    }
  }
    #swagger.responses[401] = {
    description: 'Sem permissão',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'faça o login para realizar esta ação'}
          }
        }
      }
    }
  }
  */
};

exports.updateArtist = async (req, res) => {
  const artist = await artistServices.editArtist(req.params.id, req.body);
  if (!artist) {
    res.status(404).json({ erro: "artista não encontrado, tente outra id" });
  } else {
    res.status(200).json(artist);
  }
  /*
  #swagger.tags = ['artistas']
  #swagger.summary = 'edição de artistas'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.description = 'rota usada para atualizar artistas cadastrados na base de dados'
  #swagger.parameters[id] = {
      in: "path",
      description: "id do artista",
      required: true,
      type: "integer",
    }
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/artist"
        },
        examples:{
          "artist": {
            "value": {
              "name": "Elvis Presley",
              "genre": "Rock",
            }
          }
        }
      }
    }
  }#swagger.responses[400] = {
    description: 'artista não adicionado',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'houve um erro com o artista enviado'}
          }
        }
      }
    }
  }
    #swagger.responses[401] = {
    description: 'Sem permissão',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'faça o login para realizar esta ação'}
          }
        }
      }
    }
  }
    #swagger.responses[404] = {
    description: 'artista não encontrado',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            erro: { type: 'string', example: 'artista não encontrado, tente outra id'}
          }
        }
      }
    }
  }
  */
};

exports.deleteArtist = async (req, res) => {
  const artist = await artistServices.removeArtist(req.params.id);

  if (!artist) {
    res
      .status(404)
      .json({ error: "nenhum artista encontrado com a id especificada" });
  } else {
    res
      .status(200)
      .json({ message: "O seguinte artista foi removido", artista: artist });
  }

  /*
  #swagger.tags = ['artistas']
  #swagger.summary = 'apagar um artista'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.description = 'rota usada para deletar artistas na base de dados'
  #swagger.responses[200] = {
      description: 'artista deletado com sucesso.',
      content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/artist'
          }
        }
      }
    }
  }#swagger.responses[404] = {
    description: 'artista não encontrado',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: "nenhum artista encontrado com a id especificada"}
          }
        }
      }
    }
  }
    #swagger.responses[401] = {
    description: 'Sem permissão',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'faça o login para realizar esta ação'}
          }
        }
      }
    }
  }
  */
};
