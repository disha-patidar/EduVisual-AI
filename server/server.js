import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "15mb" }));

const PORT = process.env.PORT || 5000;

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is missing in .env");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// --------------------------------------------------
// Helper: Clean JSON returned by Gemini
// --------------------------------------------------

function cleanJson(text) {
  let cleaned = text.trim();

  // Remove markdown code fences
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```json\s*/i, "");
    cleaned = cleaned.replace(/^```\s*/i, "");
    cleaned = cleaned.replace(/\s*```$/i, "");
  }

  return cleaned.trim();
}

// --------------------------------------------------
// Generate educational content
// --------------------------------------------------

async function generateEducationalContent({
  topic,
  subject,
  classLevel,
  style,
  language,
}) {
  const prompt = `
You are an expert educational content creator.

Create educational material for students.

Topic: ${topic}
Subject: ${subject}
Class Level: ${classLevel}
Illustration Style: ${style}
Language: ${language}

Return ONLY valid JSON.

Do not use markdown.
Do not add explanations outside JSON.

The JSON must have this exact structure:

{
  "title": "string",
  "explanation": "string",
  "keyPoints": [
    "string",
    "string",
    "string",
    "string",
    "string"
  ],
  "importantTerms": [
    "string",
    "string",
    "string",
    "string"
  ],
  "quiz": [
    {
      "question": "string",
      "options": [
        "string",
        "string",
        "string",
        "string"
      ],
      "answer": "string"
    },
    {
      "question": "string",
      "options": [
        "string",
        "string",
        "string",
        "string"
      ],
      "answer": "string"
    },
    {
      "question": "string",
      "options": [
        "string",
        "string",
        "string",
        "string"
      ],
      "answer": "string"
    }
  ],
  "imagePrompt": "string"
}

Requirements:

- Explanation should be easy for the specified class level.
- Key points should be educational and concise.
- Important terms should be useful for revision.
- Create 3 multiple-choice questions.
- Each question must have exactly 4 options.
- The answer must exactly match one option.
- The imagePrompt must describe a clear educational illustration.
- The illustration should contain important concepts related to the topic.
- Use the requested language.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini did not return educational content.");
  }

  const jsonText = cleanJson(text);

  return JSON.parse(jsonText);
}

// --------------------------------------------------
// Generate educational image
// --------------------------------------------------

async function generateEducationalImage({
  topic,
  subject,
  classLevel,
  style,
  language,
  imagePrompt,
}) {
  const finalPrompt = `
Create a high-quality educational illustration.

Topic: ${topic}
Subject: ${subject}
Class level: ${classLevel}
Language: ${language}
Requested style: ${style}

Detailed instructions:

${imagePrompt}

The image must be:

- Educational
- Clear
- Easy to understand
- Suitable for students
- Visually organized
- Clean and attractive
- Suitable for classroom learning
- Include arrows, labels, diagrams or visual relationships when appropriate

Avoid:

- Unnecessary decorative elements
- Photorealistic people unless required
- Confusing layouts
- Excessive text
- Watermarks or logos

Create the illustration as a clean educational visual.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image",
    contents: finalPrompt,

    config: {
      responseFormat: {
        image: {
          aspectRatio: "16:9",
        },
      },
    },
  });

  const parts = response?.candidates?.[0]?.content?.parts || [];

  for (const part of parts) {
    if (part.inlineData) {
      const mimeType = part.inlineData.mimeType || "image/png";

      const imageData = part.inlineData.data;

      return `data:${mimeType};base64,${imageData}`;
    }
  }

  throw new Error("Gemini did not return an image.");
}

// --------------------------------------------------
// Main Generate API
// --------------------------------------------------

app.post("/api/generate", async (req, res) => {
  try {
    const { topic, subject, classLevel, style, language } = req.body;

    // Validation
    if (!topic || !subject || !classLevel || !style || !language) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    console.log("Generating content for:", topic);

    // Step 1: Generate educational content
    const educationalContent = await generateEducationalContent({
      topic,
      subject,
      classLevel,
      style,
      language,
    });

    console.log("Educational content generated.");

    // Step 2: Generate image
    const image = await generateEducationalImage({
      topic,
      subject,
      classLevel,
      style,
      language,
      imagePrompt: educationalContent.imagePrompt,
    });

    console.log("Educational image generated.");

    // Step 3: Send everything to frontend
    return res.json({
      success: true,

      data: {
        title: educationalContent.title,

        explanation: educationalContent.explanation,

        keyPoints: educationalContent.keyPoints,

        importantTerms: educationalContent.importantTerms,

        quiz: educationalContent.quiz,

        image,
      },
    });
  } catch (error) {
    console.error("Generation error:", error);

    return res.status(500).json({
      success: false,

      message:
        error.message || "Something went wrong while generating content.",
    });
  }
});

// --------------------------------------------------
// Test route
// --------------------------------------------------

app.get("/", (req, res) => {
  res.json({
    message: "EduDraw AI backend is running!",
  });
});

// --------------------------------------------------
// Start server
// --------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
