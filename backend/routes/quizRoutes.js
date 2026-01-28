const express = require("express");
const Quiz = require("../models/Quiz");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, async (req, res) => {
  try {
    const { title, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ message: "Title and questions required" });
    }

    const quiz = await Quiz.create({
      title,
      questions,
      createdBy: req.user,
    });

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().select(
      "title questions createdBy createdAt",
    );
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
