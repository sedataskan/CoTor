const express = require("express");
const app = express();
require("dotenv").config();
const request = require("request");
const fs = require("fs");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//------------linkedin part----------------

var ACCESS_TOKEN = process.env.ACCESS_TOKEN;

async function post(postData) {
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
                  return result;
                })
                .catch((err) => {
                  console.log("err", err);
                  return err;
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
      return err;
    });
}

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
    const path = "images/resized.jpeg";
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
  fs.unlink("images/image.jpeg", (err) => {
    if (err) {
      console.log("Error deleting image!");
    }
    console.log("Image deleted successfully!");
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

module.exports = {
  registerImage,
  uploadImage,
  deleteImage,
  publish,
  getUserId,
  post,
};
