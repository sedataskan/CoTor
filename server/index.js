const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const request = require("request");
const axios = require("axios");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");
const sharp = require("sharp");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

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
    "şirketimize " +
    date.slice(12, date.length - 1) +
    ' ile ilgili Türkçe, 200 karakterlik sosyal medya postu oluştur. Resmi bir dil kullan. Türkçe harici bir dil kullanma."" kullanma';
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

var ACCESS_TOKEN = process.env.ACCESS_TOKEN;

app.post("/post", async function (req, res) {
  const postData = {
    title: req.body.title,
    body: req.body.body,
    imageUrl: req.body.imageUrl,
  };
  getUserId(ACCESS_TOKEN)
    .then((user) => {
      const userId = JSON.parse(user).id;
      registerImage(userId, ACCESS_TOKEN)
        .then((registerUpload) => {
          const assetId = JSON.parse(registerUpload).value.asset;
          uploadImage(
            JSON.parse(registerUpload).value.uploadMechanism[
              "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
            ].uploadUrl,
            ACCESS_TOKEN
          )
            .then(async (path) => {
              await publish(ACCESS_TOKEN, userId, postData, assetId)
                .then((result) => {
                  deleteImage(path);
                  res.send(result);
                })
                .catch((err) => {
                  console.log("err", err);
                  res.status(500).json(err);
                });
            })
            .catch((err) => {
              console.log("err2", err);
            });
        })
        .catch((err) => {
          console.log("err1", err);
        });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json(err);
    });
});

function registerImage(userId, access_token) {
  const body = {
    registerUploadRequest: {
      recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
      owner: "urn:li:person:" + userId,
      serviceRelationships: [
        {
          relationshipType: "OWNER",
          identifier: "urn:li:userGeneratedContent",
        },
      ],
    },
  };
  return new Promise((resolve, reject) => {
    request.post(
      "https://api.linkedin.com/v2/assets?action=registerUpload",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
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

function uploadImage(uploadUrl, accessToken) {
  return new Promise((resolve, reject) => {
    const path = "resized.jpeg";
    const fileData = fs.readFileSync(path);
    request.post(
      uploadUrl,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/octet-stream",
        },
        body: fileData,
      },
      function (err, response, body) {
        if (err) {
          reject(err);
        } else {
          resolve(path);
        }
      }
    );
  });
}

function deleteImage(path) {
  fs.unlink(path, (err) => {
    if (err) {
      console.log("Error deleting image!");
    }
    console.log("Image deleted successfully!");
  });
  fs.unlink("image.jpeg", (err) => {
    if (err) {
      console.log("Error deleting image!");
    }
    console.log("Image deleted successfully!");
  });
}

async function downloadImage(url, filename) {
  return new Promise(async (resolve, reject) => {
    const response = await axios.get(url, { responseType: "arraybuffer" });

    fs.writeFile(filename, response.data, (err) => {
      if (err) {
        console.log("Error downloading image!");
        reject(err);
      }
      console.log("Image downloaded successfully!");
      resolve();
    });
  });
}

function publish(accessToken, userId, postData, assetId) {
  const body = {
    author: "urn:li:person:" + userId,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: postData.body,
        },
        shareMediaCategory: "IMAGE",
        media: [
          {
            status: "READY",
            description: {
              text: "Center stage!",
            },
            media: assetId,
            title: {
              text: "LinkedIn Talent Connect 2021",
            },
          },
        ],
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

function watermarkImage(path) {
  const logoPath = "../assets/raquun-logo.png";
  return new Promise((resolve, reject) => {
    Jimp.read(path)
      .then(async (mainImage) => {
        const logo = await Jimp.read(logoPath);

        const logoWidth = mainImage.getWidth() / 8;
        const logoHeight = logo.getHeight() / (logo.getWidth() / logoWidth);
        logo.resize(logoWidth, logoHeight);

        const logoX = 100;
        const logoY = mainImage.getHeight() - logo.getHeight() - 100;

        mainImage.composite(logo, logoX, logoY);
        return await mainImage.writeAsync(path);
      })
      .then(() => {
        resolve(path);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function imageToBase64(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64String = imageBuffer.toString("base64");

    return base64String;
  } catch (err) {
    console.error("Error converting image to Base64:", err.message);
    return null;
  }
}

async function resizeImage(imagePath) {
  const resized = "resized.jpeg";
  await sharp(imagePath).resize({ width: 800 }).toFile(resized);
  return resized;
}

// ---------------unsplash part----------------
app.post("/photo", async (req, res) => {
  var date = JSON.stringify(req.body);
  const prompt = date.slice(12, date.length - 1);

  const apiKey = process.env.UNSPLASH_ACCESS_KEY;
  const getId = `https://api.unsplash.com/search/photos?query=${prompt}&client_id=${apiKey}`;

  const response = await axios.get(getId);
  const imageId = response.data.results[0].id;

  const apiUrl = `https://api.unsplash.com/photos/${imageId}?client_id=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const imageUrl = response.data.urls.raw;

    await downloadImage(imageUrl, "image.jpeg").then(async (_) => {
      await watermarkImage("image.jpeg").then(async (_) => {
        await resizeImage("image.jpeg");
        const image = imageToBase64("resized.jpeg");
        return res.status(200).json({
          success: true,
          imageUrl: image,
        });
      });
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
