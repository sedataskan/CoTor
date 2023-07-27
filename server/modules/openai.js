const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organizationId: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
  basePath: "https://api.openai.com/v1",
});
const openai = new OpenAIApi(configuration);

async function generate(prompt) {
  var date = JSON.stringify(prompt);
  const generatedPrompt =
    "şirketimize " +
    date +
    ' ile ilgili Türkçe, 200 karakterlik sosyal medya postu oluştur. Resmi bir dil kullan. Türkçe harici bir dil kullanma."" kullanma';
  try {
    if (generatedPrompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: generatedPrompt }],
    });
    const completion = response.data.choices[0].message.content;
    return {
      success: true,
      message: completion,
    };
  } catch (error) {
    console.log(error.message);
    throw new Error("Something went wrong while generating the prompt.");
  }
}

module.exports = { generate };
