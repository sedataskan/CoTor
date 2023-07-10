const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

// CORS
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const configuration = new Configuration({
  organizationId: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// JSON
app.use(express.json());

// OpenAI API
app.post("/generate", async (req, res) => {
  console.log(req.body);
  const prompt = "bana " + req.body + " ile ilgili sosyal medya postu oluştur.";
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo-16k-0613",
      prompt,
    });
    const completion = response.data.choices[0].text;
    console.log(prompt, completion);
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});
