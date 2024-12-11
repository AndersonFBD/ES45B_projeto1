/* estrutura do usuário
 * uid: numero, autoinserido pela API, não requer validação
 * username - string, alfanumerico, obrigatório, entre 4 e 12 caracteres
 * password - string, alfanumerico, obrigatório, entre 6 e 18 caracteres
 * isAdmin - boolean, padrão: false, obrigatório.
 */
const { body, param, validationResult } = require("express-validator");

const validateUser = [
  body("username")
    .notEmpty()
    .withMessage("O nome de usuário é obrigatório")
    .isLength({ min: 4, max: 20 })
    .withMessage("o nome deve ter entre 4 e 12 caracteres alfanuméricos"),
  body("password")
    .notEmpty()
    .withMessage("é obrigatório colocar uma senha")
    .isLength({ min: 6, max: 18 })
    .withMessage("a senha deve conter entre 6 e 18 caracteres"),
  body("isAdmin").isBoolean().optional().default(false),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUserUpdate = [
  body("username")
    .optional()
    .isLength({ min: 4, max: 20 })
    .withMessage("o nome deve ter entre 4 e 12 caracteres alfanuméricos"),
  body("password")
    .optional()
    .isLength({ min: 6, max: 18 })
    .withMessage("a senha deve conter entre 6 e 18 caracteres"),
  body("isAdmin").isBoolean().optional().default(false),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateUser, validateUserUpdate };
