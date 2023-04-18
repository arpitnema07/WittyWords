// Load the required modules
const express = require("express");
const openai = require("openai");
require("dotenv").config();

// Set up the OpenAI API client
openai.api_key = process.env.OPENAI_API_KEY;

// Set up the Express app
const app = express();

// Set up the API route for generating text
app.post("/api/generate_text", async (req, res) => {
  // Get the prompt from the request body
  const prompt = req.body.prompt;

  // Set up the request parameters for the OpenAI API
  const params = {
    prompt: generatePrompt(prompt),
    temperature: 0.5,
    max_tokens: 50,
    n: 1,
    stop: "\n",
  };

  try {
    // Call the OpenAI API to generate text
    const response = await openai.completions.create(params);

    // Extract the generated text from the API response
    const text = response.choices[0].text.trim();

    // Return the generated text as JSON
    res.json({ text: text });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating text");
  }
});

function generatePrompt(scenario) {
  const promptTemplates = [
    "Respond in a witty way that shows off your sense of humor.",
    "Respond in a witty way that shows off your social skills.",
    "Respond in a witty way that shows off your problem-solving skills.",
    "Respond in a witty way that shows off your charm.",
    "Respond in a witty way that shows off your work ethic.",
  ];

  // Choose a random prompt template
  const promptTemplate =
    promptTemplates[Math.floor(Math.random() * promptTemplates.length)];

  // Replace the scenario placeholder with the actual scenario
  const prompt = scenario + ". " + promptTemplate;
  return prompt;
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
