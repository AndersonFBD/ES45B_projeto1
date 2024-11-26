const express = require("express");
const userController = require("../controllers/userController");
const { validateUser } = require("../validations/userValidator");

const router = express.router();

//TODO:as rotas de exclusão deveriam ser acessadas apenas pelos admins
// considerar tbm uma rota para criação de contas admins
// criar rota de login e logout uma vez que os tokens JWT estiverem implementados
router.get("/users", userController.listAllUsers);
router.get("/user/:id", userController.findUser);
router.post("/user", validateUser, userController.createUser);
router.put("/user/:id", validateUser, userController.editUser);
router.delete("/user", userController.deleteUser);

module.exports = router;
