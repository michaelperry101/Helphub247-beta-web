import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const prompt = req.query.prompt || "Write a one-sentence bedtime story about a unicorn.";
    const response = await client.responses.create({
      model: "gpt-5",
      input: prompt
    });
    const story = response.output[0].content[0].text;
    res.status(200).json({ story });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
}
