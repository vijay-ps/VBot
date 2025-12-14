const askGemini = require("../gemini");

module.exports = async (interaction) => {
  await interaction.deferReply(); // ✅ acknowledge immediately

  const msg = interaction.options.getString("message");
  const prompt = `Reply only in Tamil. Be friendly. Message: ${msg}`;

  try {
    const reply = await askGemini(prompt, interaction.user.id);

    await interaction.editReply(reply); // ✅ respond after AI finishes
  } catch (error) {
    if (error.message === "RATE_LIMIT") {
      await interaction.editReply(
        "⏳ Whoa there! Please wait 10 seconds before asking again."
      );
    } else {
      throw error;
    }
  }
};
