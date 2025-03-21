const express = require("express");
const artistController = require("../controllers/artistController");
const { verifyCredentials } = require("../middlewares/verifyCredentials");
const {
  validateArtist,
  validateArtistUpdate,
} = require("../validations/artistValidator");
const router = express.Router();

//apenas usuarios logados podem adicionar, editar ou remover artistas
router.get("/", artistController.getAll);
router.get("/:id", artistController.findOneArtist);
router.post("/", verifyCredentials, validateArtist, artistController.addArtist);
router.put(
  "/:id",
  verifyCredentials,
  validateArtistUpdate,
  artistController.updateArtist
);
router.delete("/:id", verifyCredentials, artistController.deleteArtist);

module.exports = router;
