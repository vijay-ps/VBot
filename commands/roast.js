const askGemini = require("../gemini");

module.exports = async (interaction) => {
  await interaction.deferReply();

  const user = interaction.options.getUser("user");
  const target = user ? user.username : "this person";

  const prompt = `Give a funny, friendly roast for ${target}. Keep it short.`;

  try {
    const roast = await askGemini(prompt, interaction.user.id);

    await interaction.editReply(roast);
  } catch (error) {
    if (error.message === "RATE_LIMIT") {
      await interaction.editReply(
        "⏳ Too fast! Wait 10 seconds before another roast."
      );
    } else {
      throw error;
    }
  }
};
