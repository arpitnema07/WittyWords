const express = require("express");
const router = express.Router();
const openai = require("openai");

// Set up the OpenAI API key
openai.api_key = "YOUR_API_KEY_HERE";

// Define a route for generating text
router.post("/generate_text", async (req, res) => {
  try {
    // Get the user input from the request body
    const prompt = req.body.prompt;

    // Call the OpenAI API to generate text
    const response = await openai.Completion.create({
      engine: "davinci",
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    // Return the generated text as the response
    res.json({ text: response.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
