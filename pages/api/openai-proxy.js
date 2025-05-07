// pages/api/openai-proxy.js

import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,    // ← no literal fallback here!
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed; use POST with a JSON body." });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided." });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const text = completion.data.choices[0].message?.content?.trim() || "";
    return res.status(200).json({ result: text });
  } catch (err) {
    console.error("OpenAI error:", err);
    return res
      .status(500)
      .json({ error: "OpenAI request failed. See logs for details." });
  }
}
