import OpenAI from "openai";

// 🔥 Free models priority list
const MODELS = (process.env.MODELS || "").split(",").filter(Boolean);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default async function chatgpt(prompt) {
  // ✅ Ensure env is loaded
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing. Check your .env file.");
  }

  // ✅ Create client INSIDE function (fixes your error)
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // OpenRouter key
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "College Project Demo",
    },
  });

  for (let model of MODELS) {
    try {
      console.log("Trying model:", model);

      const response = await client.chat.completions.create({
        model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 500,
      });

      const text = response?.choices?.[0]?.message?.content;

      if (text && text.trim() !== "") {
        console.log("Success with model:", model);
        return text;
      }

    } catch (err) {
      console.log("Model failed:", model);

      // Debug message
      console.log("Error:", err?.error?.message || err.message);

      // If NOT rate limit → stop trying further
      if (err.status !== 429) {
        break;
      }

      // Wait before trying next model
      await sleep(1000);
    }
  }

  // ✅ FINAL FALLBACK (prevents DB crash)
  return "AI service is currently busy. Please try again shortly.";
}