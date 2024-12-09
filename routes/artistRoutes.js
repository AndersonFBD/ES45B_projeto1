const express = require("express");
const artistController = require("../controllers/artistController");
const { verifyCredentials } = require("../middlewares/verifyCredentials");

const router = express.Router();

router.get("/all", artistController.getAll);
