const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const session = require("express-session");
const request = require("request");
const axios = require("axios");
// CORS
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//-----------------OpenAI API-----------------
const configuration = new Configuration({
  organizationId: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
  basePath: "https://api.openai.com/v1",
});
const openai = new OpenAIApi(configuration);

var completion = " ";

// JSON
app.use(express.json());

//API
app.post("/generate", async (req, res) => {
  var date = JSON.stringify(req.body);
  const prompt =
    "bana " +
    date.slice(12, date.length - 1) +
    " ile ilgili Türkçe, 200 karakterlik sosyal medya postu oluştur.";
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    completion = response.data.choices[0].message.content;
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

//------------linkedin part----------------

var clientSecret = process.env.LINKEDIN_API_KEY;
var ACCESS_TOKEN = process.env.ACCESS_TOKEN;
var userId = "";

app.set("view engine", "ejs");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: clientSecret,
  })
);

app.post("/post", async function (req, res) {
  const postData = {
    title: req.body.title,
    body: req.body.body,
    imageUrl: req.body.imageUrl,
  };

  getUserId(ACCESS_TOKEN)
    .then((user) => {
      userId = JSON.parse(user).id;
      publish(ACCESS_TOKEN, userId, postData)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          console.log("err", err);
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json(err);
    });
});

function publish(accessToken, userId, postData) {
  const body = {
    author: "urn:li:person:" + userId,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: postData.body,
        },
        shareMediaCategory: "NONE",
        // shareMediaCategory: "IMAGE",
        // media: [
        //   {
        //     status: "READY",
        //     description: {
        //       text: "Center stage!",
        //     },
        //     media: "urn:li:digitalmediaAsset:" + postData.imageUrl,
        //     title: {
        //       text: "LinkedIn Talent Connect 2021",
        //     },
        //   },
        // ],
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  return new Promise((resolve, reject) => {
    request.post(
      "https://api.linkedin.com/v2/ugcPosts",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      },
      function (err, response, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      }
    );
  });
}

function getUserId(access_token) {
  return new Promise((resolve, reject) => {
    request.get(
      "https://api.linkedin.com/v2/me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
      function (err, response, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      }
    );
  });
}

// ---------------unsplash part----------------
app.post("/photo", async (req, res) => {
  var date = JSON.stringify(req.body);
  const prompt = date.slice(12, date.length - 1);

  const apiKey = process.env.UNSPLASH_ACCESS_KEY; // Unsplash API anahtarınızı buraya girin
  const getId = `https://api.unsplash.com/search/photos?query=${prompt}&client_id=${apiKey}`;

  const response = await axios.get(getId);
  const imageId = response.data.results[0].id; // İlk sonuçtan imageId'yi alın

  const apiUrl = `https://api.unsplash.com/photos/${imageId}?client_id=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const imageUrl = response.data.urls.raw;
    return res.status(200).json({
      success: true,
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      imageUrl:
        "https://user-images.githubusercontent.com/47315479/81145216-7fbd8700-8f7e-11ea-9d49-bd5fb4a888f1.png",
    });
  }
});
