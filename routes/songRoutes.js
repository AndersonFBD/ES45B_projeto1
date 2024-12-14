const express = require("express");
const songController = require("../controllers/songController");
const { verifyCredentials } = require("../middlewares/verifyCredentials");
const {
  validateSong,
  validateSongUpdate,
} = require("../validations/songValidator");
const router = express.Router();

router.get("/", songController.getAllSongs);
router.get("/idSearch/:id", songController.findById);
router.post("/search/byTitle", songController.findByTitle);
router.post("/search/byArtist", songController.findByArtist);
router.post("/search/byAlbum", songController.findByAlbum);
router.post("/", verifyCredentials, validateSong, songController.addSong);
router.put(
  "/:id",
  verifyCredentials,
  validateSongUpdate,
  songController.updateSong
);
router.delete("/:id", verifyCredentials, songController.deleteSong);

module.exports = router;
