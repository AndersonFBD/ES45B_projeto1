/* estrutura do artista:
 * id - numero, autoinserido pela API, não requer validação
 * name - alfanumerico, pelo menos 2 caracteres, limite máximo de
 * 50 caracteres
 * genre - alfanumerico, entre 3 a 30 caracteres
 *
 */

const { body, validationResult } = require("express-validator");

const validateArtist = [
  body("name")
    .notEmpty()
    .withMessage("nome é obrigatório")
    .isLength({ min: 2, max: 50 })
    .withMessage("o nome deve ser entre 2 e 50 caracteres"),
  body("genre")
    .notEmpty()
    .withMessage("genero musical é obrigatório")
    .isLength({ min: 3, max: 30 })
    .withMessage("o genero deve conter entre 3 e 30 caracteres"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateArtistUpdate = [
  body("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("o nome deve ser entre 2 e 50 caracteres"),
  body("genre")
    .optional()
    .isLength({ min: 3, max: 30 })
    .withMessage("o genero deve conter entre 3 e 30 caracteres"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateArtist, validateArtistUpdate };
