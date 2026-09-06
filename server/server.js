const express = require("express");
const cors = require("cors");
require("dotenv").config();

const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://edu-visual-ai.vercel.app/"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "EduVisual AI API is running",
  });
});

app.use("/api/ai", aiRoutes);

module.exports = app;
