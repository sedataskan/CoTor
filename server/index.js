const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// CORS
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//get text with openai.js
var text = require("./modules/openai.js");
var image = require("./modules/image.js");
var linkedin = require("./modules/linkedin.js");

app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.selected;
    const message = JSON.stringify((await text.generate(prompt)).message);
    res.status(200).json({
      success: true,
      message: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/photo", async (req, res) => {
  try {
    const prompt = req.body.selected;
    const result = await image.generate(prompt);
    res.status(200).json({
      success: true,
      imageUrl: result.imageUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      imageUrl: null,
    });
  }
});

app.post("/post", async (req, res) => {
  try {
    const postData = {
      title: req.body.title,
      body: req.body.body,
      imageUrl: req.body.imageUrl,
    };
    const result = await linkedin.post(postData);
    res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
