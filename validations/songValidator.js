/* estrutura da musica
 * id: numero, autoinserido pela API, não requer validação
 * title - string, alfanumerico, obrigatório, pelo menos 3 caracteres
 * album - string, alfanumerico, obrigatório, pelo menos 3 caracteres
 * artist - string, alfanumerico, obrigatório, entre 2 e 30 caracteres
 * year - numerico, obrigatório, maior que 1900 e menor ou igual ao ano atual
 */
const { body, validationResult } = require("express-validator");
const ano = new Date().getFullYear();

const validateSong = [
  body("title")
    .notEmpty()
    .withMessage("O titulo é obrigatório")
    .isLength({ min: 3 })
    .withMessage("o titulo deve ter no mínimo 3 caracteres"),
  body("album")
    .notEmpty()
    .withMessage("o album é obrigatório")
    .isLength({ min: 3 })
    .withMessage("o album deve conter no mínimo 3 caracteres"),
  body("artist")
    .notEmpty()
    .withMessage("o artista é obrigatório")
    .isLength({ min: 2, max: 50 })
    .withMessage("o artista deve conter entre 2 e 50 caracteres"),
  body("year")
    .notEmpty()
    .withMessage("campo ano obrigatório")
    .isInt({ min: 1900, max: ano })
    .withMessage("insira um ano válido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateSongUpdate = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("O titulo é obrigatório")
    .isLength({ min: 3 })
    .withMessage("o titulo deve ter no mínimo 3 caracteres"),
  body("album")
    .optional()
    .notEmpty()
    .withMessage("o album não pode ficar vazio")
    .isLength({ min: 3 })
    .withMessage("o album deve conter no mínimo 3 caracteres"),
  body("artist")
    .optional()
    .notEmpty()
    .withMessage("o artista é obrigatório")
    .isLength({ min: 3, max: 30 })
    .withMessage("o artista deve conter entre 3 e 30 caracteres"),
  body("year")
    .optional()
    .notEmpty()
    .withMessage("campo ano não pode ficar vazio")
    .isInt({ min: 1900, max: ano })
    .withMessage("insira um ano válido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateSong, validateSongUpdate };
