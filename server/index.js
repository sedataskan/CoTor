const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");

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

//linkedin part

linkedin_Api = process.env.LINKEDIN_API_KEY;
linkedin_user_id = process.env.LINKEDIN_ID_KEY;

app.post("/post", async () => {
  console.log("post");
  // try {
  //   const accessToken = `Bearer ${linkedin_Api}`;

  //   const postContent = {
  //     author: `f'urn:li:person:${linkedin_user_id}`, // Gönderiyi oluşturan kişinin LinkedIn kullanıcı kimliği
  //     lifecycleState: "PUBLISHED",
  //     specificContent: {
  //       "com.linkedin.ugc.ShareContent": {
  //         shareCommentary: {
  //           text: "Bu gönderi LinkedIn üzerinden paylaşıldı.", // Gönderi metni
  //         },
  //         shareMediaCategory: "NONE",
  //       },
  //     },
  //     visibility: {
  //       "com.linkedin.ugc.MemberNetworkVisibility": "CONNECTIONS", // Gönderinin görünürlük ayarı (CONNECTIONS, PUBLIC)
  //     },
  //   };

  //   const response = await axios.post(
  //     "https://api.linkedin.com/v2/ugcPosts",
  //     postContent,
  //     {
  //       headers: {
  //         Authorization: accessToken,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   console.log(response.data); // Gönderi oluşturulduğunda alınan yanıtı konsola yazdırabilirsiniz.

  //   res.status(200).json({ message: "Gönderi başarıyla oluşturuldu." });
  // } catch (error) {
  //   console.error(error);
  //   response
  //     .status(500)
  //     .json({ message: "Gönderi oluşturulurken bir hata oluştu." });
  // }
});
