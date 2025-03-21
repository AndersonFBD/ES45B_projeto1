const express = require("express");
const userController = require("../controllers/userController");
const {
  validateUser,
  validateUserUpdate,
} = require("../validations/userValidator");
const { verifyCredentials } = require("../middlewares/verifyCredentials"); //verifica validade do token de autenticação para liberar acesso

const router = express.Router();

//TODO:considerar que as rotas de exclusão deveriam ser acessadas apenas pelos admins
// considerar tbm uma rota para criação de contas admins
// criar rota de login e logout uma vez que os tokens JWT estiverem implementados [concluído]
router.get("/all", verifyCredentials, userController.listAllUsers);
router.get("/find/:id", verifyCredentials, userController.findUser);
router.get("/myProfile", verifyCredentials, userController.viewMyProfile);
router.post("/", validateUser, userController.createUser);
// rota para admins alterarem outros perfis
router.put(
  "/edit/:uid",
  verifyCredentials,
  validateUserUpdate,
  userController.editUser
);
//rota para usuários alterarem informações de seus perfis
router.put(
  "/editProfile/",
  verifyCredentials,
  validateUserUpdate,
  userController.editMyProfile
);
router.delete("/:uid", verifyCredentials, userController.deleteUser);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

// rota especifica para novo admin
router.post(
  "/newAdmin",
  verifyCredentials,
  validateUser,
  userController.addNewAdmin
);

module.exports = router;
