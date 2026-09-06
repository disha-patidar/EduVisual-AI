const express = require("express");

const { generateLesson } = require("../controllers/aiController");

const router = express.Router();

router.post("/generate", generateLesson);

module.exports = router;
