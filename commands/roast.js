const askGemini = require("../gemini");

module.exports = async (interaction) => {
  await interaction.deferReply();

  const user = interaction.options.getUser("user");
  const target = user ? user.username : "this person";

  const prompt = `Give a funny, friendly roast for ${target}. Keep it short.`;

  const roast = await askGemini(prompt);

  await interaction.editReply(roast);
};
