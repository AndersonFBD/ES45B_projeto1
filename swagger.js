const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const ano = new Date().getFullYear();

const doc = {
  info: {
    version: "0.0.1",
    title: "ES45B API PROJETO 1",
    description: "Projeto da disciplina de Programação Web Back-end",
  },
  host: "localhost:3000",
  basepath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "login/logout",
      description: "rotas usadas para a criar e encerrar as sessões do usuário",
    },
    {
      name: "usuários",
      description: "rotas que envolvem manuseio de dados de usuários",
    },
    {
      name: "artistas",
      description: "rotas que envolvem manuseio de dados de artistas",
    },
    {
      name: "musicas",
      description: "rotas que envolvem manuseio dos dados das musicas",
    },
  ],
  components: {
    schemas: {
      // schema de usuario
      user: {
        username: {
          type: "string",
          description: "nome de usuário",
          minLength: 4,
          maxLength: 20,
        },
        password: {
          type: "string",
          description: "senha de acesso do usuário",
          minLength: 6,
          maxLength: 18,
        },
        isAdmin: {
          type: "boolean",
          description: "flag de usuário administrador",
        },
      },
      // schema para artistas
      artist: {
        id: {
          type: "integer",
          description: "numero de identificação de artista",
        },
        name: {
          type: "string",
          description: "nome do artista/ grupo musical",
          minLength: 2,
          maxLength: 50,
        },
        genre: {
          type: "string",
          description: "genero musical predominante do artista",
          minLength: 3,
          maxLength: 30,
        },
      },

      //   schema de musicas
      song: {
        id: {
          type: "integer",
          description: "numero de identificação de musica",
        },
        title: {
          type: "string",
          description: "titulo da música",
          minLength: 3,
        },
        album: {
          type: "string",
          description: "album no qual a música pertence",
          minLength: 3,
        },
        artist: {
          type: "string",
          description: "artista da música",
          minLength: 2,
          maxLength: 50,
        },
        year: {
          type: "integer",
          description: "ano de lançamento da música",
          minimum: 1900,
          maximum: ano,
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsfiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsfiles, doc);
