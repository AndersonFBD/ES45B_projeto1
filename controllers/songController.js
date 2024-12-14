const songServices = require("../services/songServices");

exports.getAllSongs = async (req, res) => {
  let page = Number(req.query.page);
  let limit = Number(req.query.limit);
  if (limit !== 5 && limit !== 10 && limit !== 30)
    return res.status(400).json({ error: "o limite deve ser 5, 10 ou 30" });
  const library = await songServices.listAllSongs(page, limit);
  return res.status(200).json(library);
  /*
  #swagger.tags = ['musicas']
  #swagger.summary = 'realiza a listagem das musicas'
  #swagger.description = 'A rota retorna todas as musicas conforme definido página e limite nos parametros'
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
    description: 'musicas dessa página:',
    content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/song'
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

exports.findById = async (req, res) => {
  const song = await songServices.getSongById(Number(req.params.id));

  if (!song) {
    res.status(404).json({ erro: "nenhuma musica encontrada" });
  }

  res.status(200).json(song);
  /*
  #swagger.tags = ['musicas']
  #swagger.summary = 'realiza a busca da musica pela id'
  #swagger.description = 'A rota retorna a musica conforme definido a id na URL'
  #swagger.parameters['id'] =
    {
      in: "path",
      description: "id da musica",
      required: true,
      type: "integer",
    }
    #swagger.responses[200] = {
    description: 'musica encontrada:',
    content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/song'
          }
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: 'musica não encontrada',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'nenhuma musica encontrada com a id especificada'}
          }
        }
      }
    }
  }
  */
};
exports.findByTitle = async (req, res) => {
  const results = await songServices.findByTitle(req.body.title);
  res.status(200).json(results);
  /*
  #swagger.tags = ['musicas']
  #swagger.summary = 'realiza a busca da musica por algum termo do titulo'
  #swagger.description = 'A rota retorna as musicas conforme a palavra indicada conter no titulo'
    #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/song"
        },
        examples:{
          "title": {
            "value": {
              "title": "any",
            }
          }
        }
      }
    }
  }
    #swagger.responses[200] = {
    description: 'musicas encontradas:',
    content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/song'
          }
        }
      }
    }
  }
  */
};

exports.findByArtist = async (req, res) => {
  const results = await songServices.findByArtist(req.body.artist);
  res.status(200).json(results);
  /*
  #swagger.tags = ['musicas']
  #swagger.summary = 'realiza a busca da musica pelo nome do artista'
  #swagger.description = 'A rota retorna as musicas conforme o nome do artista enviado'
    #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/song"
        },
        examples:{
          "artist": {
            "value": {
              "artist": "any",
            }
          }
        }
      }
    }
  }
    #swagger.responses[200] = {
    description: 'musicas encontradas:',
    content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/song'
          }
        }
      }
    }
  }
  */
};

exports.findByAlbum = async (req, res) => {
  const results = await songServices.findByAlbum(req.body.album);
  res.status(200).json(results);
  /*
  #swagger.tags = ['musicas']
  #swagger.summary = 'realiza a busca da musica pelo nome do album'
  #swagger.description = 'A rota retorna as musicas conforme o nome do album enviado'
    #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/song"
        },
        examples:{
          "album": {
            "value": {
              "album": "any",
            }
          }
        }
      }
    }
  }
    #swagger.responses[200] = {
    description: 'musicas encontradas:',
    content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/song'
          }
        }
      }
    }
  }
  */
};

exports.addSong = async (req, res) => {
  let addedSong = await songServices.addNewSong(req.body);
  if (addedSong) {
    return res.status(201).json({ "música adicionada": addedSong });
  } else {
    return res
      .status(400)
      .json({ erro: "musica não cadastrado em nossa base" });
  }
  /*
  #swagger.tags = ['musicas']
  #swagger.summary = 'adição de musicas'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.description = 'rota usada para adicionar musicas,
  para a música ser válida, o artista na qual a música pertence precisa já estar cadastrado'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/song"
        },
        examples:{
          "song": {
            "value": {
              "title": "any",
              "album": "any",
              "artist": "any",
              "year": 2000
            }
          }
        }
      }
    }
  } #swagger.responses[201] = {
      description: 'música adicionada com sucesso.',
      content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/song'
          }
        }
      }
    }
  }
    #swagger.responses[400] = {
    description: 'musica não adicionada',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'o artista dessa canção não é cadastrado'}
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

exports.updateSong = async (req, res) => {
  const song = await songServices.editSong(req.params.id, req.body);
  if (!song) {
    res.status(404).json({ erro: "nenhuma musica encontrada" });
  } else {
    res.status(200).json(song);
  }
  /*
  #swagger.tags = ['musicas']
  #swagger.summary = 'edição de musicas'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.description = 'rota usada para atualizar musicas cadastradas'
  #swagger.parameters[id] = {
      in: "path",
      description: "id da musica",
      required: true,
      type: "integer",
    }
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/song"
        },
        examples:{
          "song": {
            "value": {
              "title": "any",
              "album": "any",
              "artist": "any",
              "year": 2000
            }
          }
        }
      }
    }
  }    #swagger.responses[200] = {
    description: 'musica atualizada',
    content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/song'
          }
        }
      }
    }
  }
    #swagger.responses[400] = {
    description: 'musica não adicionada',
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
    description: 'Sem permisão',
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
    description: 'musica não encontrado',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            erro: { type: 'string', example: 'musica não encontrada'}
          }
        }
      }
    }
  }
  */
};

exports.deleteSong = async (req, res) => {
  const song = await songServices.removeSong(req.params.id);

  if (!song) {
    res.status(404).json({ error: "nenhuma musica encontrada" });
  } else {
    res.status(200).json({ message: "musica removido", musica: song });
  }

  /*
  #swagger.tags = ['musicas']
  #swagger.summary = 'apagar um musica'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.description = 'rota usada para deletar musicas na base de dados'
  #swagger.responses[200] = {
      description: 'musica apagada com sucesso.',
      content: {
      "application/json":{
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/song'
          }
        }
      }
    }
  }#swagger.responses[404] = {
    description: 'musica não encontrada',
    content: {
      "application/json":{
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: "nenhuma musica encontrada"}
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
