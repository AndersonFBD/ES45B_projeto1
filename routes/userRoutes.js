const express = require("express");
const userController = require("../controllers/userController");
const { validateUser } = require("../validations/userValidator");
const { verifyCredentials } = require("../middlewares/verifyCredentials"); //verifica validade do token de autenticação para liberar acesso

const router = express.Router();

//TODO:as rotas de exclusão deveriam ser acessadas apenas pelos admins
// considerar tbm uma rota para criação de contas admins
// criar rota de login e logout uma vez que os tokens JWT estiverem implementados
router.get("/all", verifyCredentials, userController.listAllUsers);
router.get("/:id", verifyCredentials, userController.findUser);
router.post("/", validateUser, userController.createUser);
router.put("/:uid", verifyCredentials, validateUser, userController.editUser);
router.delete("/:uid", verifyCredentials, userController.deleteUser);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;
