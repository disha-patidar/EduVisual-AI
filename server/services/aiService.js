const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createEducationalLesson(topic, subject, level) {
  const prompt = `
You are an educational visualization designer.

Create a simple educational lesson
for this topic:

Topic: ${topic}

Subject: ${subject}

Student level: ${level}

The lesson must contain exactly
5 learning steps.

Return ONLY valid JSON.

The JSON must have this structure:

{
  "title": "string",
  "description": "string",

  "visualization": {
    "type": "string"
  },

  "steps": [
    {
      "title": "string",
      "description": "string",
      "formula": "string or null",
      "tip": "string"
    }
  ]
}

Allowed visualization types:

photosynthesis
human-heart
cell
digestion
dna

newton
projectile
electricity
solar-system
waves

atom
bonding
acid-base
reaction
states

water-cycle
rock-cycle
volcano
earth-layers
tectonics

binary-search
sorting
stack-queue
cpu-memory
network

Do NOT return JavaScript.

Do NOT return React code.

Do NOT return Markdown.

Return JSON only.
`;

  const response = await client.responses.create({
    model: "gpt-5",
    input: prompt,
  });

  return JSON.parse(response.output_text);
}

module.exports = {
  createEducationalLesson,
};
