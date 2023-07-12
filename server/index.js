const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");

const querystring = require("querystring");

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

LINKEDIN_API_KEY = process.env.LINKEDIN_API_KEY;
LINKEDIN_ID_KEY = process.env.LINKEDIN_ID_KEY;

// LinkedIn API kimlik bilgileri
const clientID = LINKEDIN_ID_KEY;
const clientSecret = LINKEDIN_API_KEY;
const callbackURL = "http://localhost:3000/callback";

const session = require("express-session");
const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

app.set("view engine", "ejs");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: clientSecret,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

passport.use(
  new LinkedInStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
    },
    function (accessToken, refreshToken, profile, cb) {
      const user = {
        id: profile.id,
        name: profile.name,
        email: profile.emailAddress,
      };
      cb(null, user);
    }
  )
);

app.get("/", function (req, res) {
  if (req.user) {
    res.redirect("/post");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", passport.authenticate("linkedin"));

app.get(
  "/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// app.get("/post", function (req, res) {
//   if (req.user) {
//     res.render("post", { user: req.user });
//   } else {
//     res.redirect("/login");
//   }
// });

app.post("/post", function (req, res) {
  if (!req.user) {
    res.redirect("/login");
  }
  const postData = {
    title: req.body.title,
    body: req.body.body,
  };
  const accessToken = req.user.accessToken;
  const request = require("request");
  request.post(
    "https://api.linkedin.com/v2/posts",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    },
    function (err, response, body) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(body);
      }
    }
  );
});

// // Oturum açma isteği
// app.get("/login", (req, res) => {
//   console.log("login");
//   const params = {
//     response_type: "code",
//     client_id: clientId,
//     redirect_uri: redirectUri,
//     scope: "r_liteprofile w_member_social",
//   };
//   const authUrl = `https://www.linkedin.com/oauth/v2/authorization?${querystring.stringify(
//     params
//   )}`;
//   res.redirect(authUrl);
// });

// // Geri çağrı işlemi
// app.get("/callback", async (req, res) => {
//   const code = req.query.code;
//   console.log("callback");

//   // Erişim token'ını alma isteği
//   const tokenParams = {
//     grant_type: "authorization_code",
//     code: code,
//     client_id: clientId,
//     client_secret: clientSecret,
//     redirect_uri: redirectUri,
//   };
//   const tokenResponse = await axios.post(
//     "https://www.linkedin.com/oauth/v2/accessToken",
//     querystring.stringify(tokenParams)
//   );
//   const accessToken = tokenResponse.data.access_token;

//   // Paylaşım yapma isteği
//   const shareData = {
//     comment: "Hello, world!",
//     visibility: "PUBLIC", // Paylaşımın herkese açık olmasını sağlar
//   };
//   console.log("share");
//   const shareResponse = await axios.post(
//     "https://api.linkedin.com/v2/ugcPosts",
//     shareData,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//         "X-Restli-Protocol-Version": "2.0.0",
//       },
//     }
//   );

//   res.send("Paylaşım yapıldı.");
// });
