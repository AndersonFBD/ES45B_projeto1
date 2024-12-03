const express = require("express");
const userController = require("../controllers/userController");
const { validateUser } = require("../validations/userValidator");

const router = express.Router();

//TODO:as rotas de exclusão deveriam ser acessadas apenas pelos admins
// considerar tbm uma rota para criação de contas admins
// criar rota de login e logout uma vez que os tokens JWT estiverem implementados
router.get("/all", userController.listAllUsers);
router.get("/:id", userController.findUser);
router.post("/", validateUser, userController.createUser);
router.put("/:uid", validateUser, userController.editUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.login);

module.exports = router;
