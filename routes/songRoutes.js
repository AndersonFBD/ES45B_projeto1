const express = require("express");
const songController = require("../controllers/songController");
const { verifyCredentials } = require("../middlewares/verifyCredentials");
const {
  validateSong,
  validateSongUpdate,
} = require("../validations/songValidator");
const router = express.Router();

router.get("/", songController.getAllSongs);
router.get("/:id", songController.findById);
router.post("/", verifyCredentials, validateSong, songController.addSong);
router.put(
  "/:id",
  verifyCredentials,
  validateSongUpdate,
  songController.updateSong
);
router.delete("/:id", verifyCredentials, songController.deleteSong);

module.exports = router;
