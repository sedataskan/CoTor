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
  basePath: "https://api.openai.com/v1",
});
const openai = new OpenAIApi(configuration);

var completion = " ";

// JSON
app.use(express.json());

// OpenAI API
app.post("/generate", async (req, res) => {
  var date = JSON.stringify(req.body);
  const prompt =
    "bana " +
    date.slice(12, date.length - 1) +
    " ile ilgili 200 karakterlik sosyal medya postu oluştur.";
  console.log(prompt);
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    completion = response.data.choices[0].message.content;
    console.log(prompt, completion);
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
