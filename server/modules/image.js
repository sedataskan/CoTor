const axios = require("axios");
const fs = require("fs");
const Jimp = require("jimp");
const sharp = require("sharp");

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

function watermarkImage(path) {
  const logoPath = "../assets/raquun-logo.png";
  const whitePath = "../assets/white.png";
  return new Promise((resolve, reject) => {
    Jimp.read(path)
      .then(async (mainImage) => {
        const logo = await Jimp.read(logoPath);

        const logoWidth = mainImage.getWidth() / 8;
        const logoHeight = logo.getHeight() / (logo.getWidth() / logoWidth);
        logo.resize(logoWidth, logoHeight);

        const logoX = 100;
        const logoY = mainImage.getHeight() - logo.getHeight() - 35;

        const white = await Jimp.read(whitePath);

        const whiteWidth = mainImage.getWidth();
        const whiteHeight = logoHeight * 2;
        white.resize(whiteWidth, whiteHeight);

        const whiteX = 0;
        const whiteY = mainImage.getHeight() - white.getHeight() - 25;

        mainImage.composite(white, whiteX, whiteY);
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
  const resized = "images/resized.jpeg";
  await sharp(imagePath).resize({ width: 800, height: 800 }).toFile(resized);
  return resized;
}

// ---------------unsplash part----------------
async function generate(text) {
  var date = JSON.stringify(text);
  const prompt = date;

  const apiKey = process.env.UNSPLASH_ACCESS_KEY;
  const getId = `https://api.unsplash.com/search/photos?query=${prompt}&client_id=${apiKey}`;

  const response = await axios.get(getId);
  const imageId = response.data.results[Math.floor(Math.random() * 5)].id;
  const apiUrl = `https://api.unsplash.com/photos/${imageId}?client_id=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const imageUrl = response.data.urls.raw;

    const image = await downloadImage(imageUrl, "images/image.jpeg");
    const resizedImage = await resizeImage("images/image.jpeg");
    const watermarkedImage = await watermarkImage("images/resized.jpeg");
    const base64Image = await imageToBase64("images/resized.jpeg");

    return {
      success: true,
      imageUrl: base64Image,
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      imageUrl:
        "https://user-images.githubusercontent.com/47315479/81145216-7fbd8700-8f7e-11ea-9d49-bd5fb4a888f1.png",
    };
  }
}

module.exports = {
  downloadImage,
  watermarkImage,
  imageToBase64,
  resizeImage,
  generate,
};
