import OpenAI from "openai";

/**
 * Calls OpenRouter LLM to explain failure
 * @param {string} prompt - Pre-built prompt from buildPrompt()
 * @returns {Promise<string>} - Explanation text
 */
export default async function chatgpt(prompt) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing at runtime");
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "College Project Demo",
    },
  });

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL,
    input: prompt,
    temperature: 0.2,
    max_output_tokens: 500,
  });

  return response.output_text;
}
