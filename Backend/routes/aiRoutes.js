const express = require("express");

const router = express.Router();

const {
  chatWithAi,
} = require("../controllers/aiController");

router.post("/chat", chatWithAi);

module.exports = router;