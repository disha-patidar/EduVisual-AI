const { createEducationalLesson } = require("../services/aiService");

async function generateLesson(req, res) {
  try {
    const { topic, subject = "general", level = "school" } = req.body;

    if (!topic?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const lesson = await createEducationalLesson(topic, subject, level);

    res.json({
      success: true,
      lesson,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to generate lesson",
    });
  }
}

module.exports = {
  generateLesson,
};
