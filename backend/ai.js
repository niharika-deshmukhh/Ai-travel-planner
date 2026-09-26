const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

console.log("SDK key check:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.slice(0, 8) + "..." : "MISSING");

async function generateTripPlan(destination, days, budget, style) {
  const prompt = `You are a travel planner. Generate a detailed itinerary for:
Destination: ${destination}
Days: ${days}
Budget: ${budget}
Style: ${style}`;

  const schema = {
    type: "object",
    properties: {
      itinerary: {
        type: "array",
        items: {
          type: "object",
          properties: {
            day: { type: "integer" },
            activities: { type: "array", items: { type: "string" } }
          },
          required: ["day", "activities"]
        }
      },
      budget: {
        type: "object",
        properties: {
          hotel: { type: "integer" },
          food: { type: "integer" },
          transport: { type: "integer" },
          activities: { type: "integer" },
          total: { type: "integer" }
        },
        required: ["hotel", "food", "transport", "activities", "total"]
      }
    },
    required: ["itinerary", "budget"]
  };

  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: schema
    }
  });

  const parsed = JSON.parse(interaction.output_text);
  return parsed;
}

module.exports = { generateTripPlan };