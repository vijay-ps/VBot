const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

function quizButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("next")
      .setLabel("Next Question")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId("end")
      .setLabel("End Quiz")
      .setStyle(ButtonStyle.Danger)
  );
}

module.exports = quizButtons;
