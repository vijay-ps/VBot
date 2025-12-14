const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const userLastRequest = new Map();

async function askGemini(prompt, userId) {
  if (userId) {
    const now = Date.now();
    const lastRequest = userLastRequest.get(userId);

    if (lastRequest && now - lastRequest < 10000) {
      throw new Error("RATE_LIMIT");
    }

    userLastRequest.set(userId, now);
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = askGemini;
