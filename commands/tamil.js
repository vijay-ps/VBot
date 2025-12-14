const askGemini = require("../gemini");

module.exports = async (interaction) => {
  await interaction.deferReply(); // ✅ acknowledge immediately

  const msg = interaction.options.getString("message");
  const prompt = `Reply only in Tamil. Be friendly. Message: ${msg}`;

  const reply = await askGemini(prompt);

  await interaction.editReply(reply); // ✅ respond after AI finishes
};
