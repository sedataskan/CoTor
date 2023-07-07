const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
const cors = require("cors");

// CORS politikalarını yapılandırın
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// JSON verileri işlemek için gerekli middleware'leri etkinleştirme
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// OpenAI API'ye istek gönderen route
app.post("/generate", async (req, res) => {
  console.log(req.body);
  //   try {
  //     const { text, prompt } = req.body;

  //     // OpenAI API'ye istek göndermek için axios
  //     const response = await axios.post(
  //       "https://api.openai.com/v1/engines/davinci-codex/completions",
  //       {
  //         prompt: prompt,
  //         max_tokens: 50,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization:
  //             "Bearer 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",
  //         },
  //       }
  //     );

  //     const output = response.data.choices[0].text.trim();
  //     res.json({ output });
  //     console.log(output);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "An error occurred" });
  //   }
});
