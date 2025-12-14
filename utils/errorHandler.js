const logger = require("./logger");

const errorHandler = async (error, interaction = null) => {
  logger.error("An error occurred:", error);

  if (interaction) {
    try {
      const message = {
        content: "⚠️ Something went wrong. Please try again later.",
        ephemeral: true,
      };

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(message);
      } else {
        await interaction.reply(message);
      }
    } catch (replyError) {
      logger.error("Failed to send error response to user:", replyError);
    }
  }
};

module.exports = errorHandler;
