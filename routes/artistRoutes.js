const express = require("express");
const artistController = require("../controllers/artistController");
const { verifyCredentials } = require("../middlewares/verifyCredentials");

const router = express.Router();

//apenas usuarios logados podem adicionar, editar ou remover artistas
router.get("/all", artistController.getAll);
router.get("/:id", artistController.findOneArtist);
router.post("/", verifyCredentials, artistController.addArtist);
router.put("/:id", verifyCredentials, artistController.updateArtist);
router.delete("/:id", verifyCredentials, artistController.deleteArtist);

module.exports = router;
