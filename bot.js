require("dotenv").config();
const { Client, GatewayIntentBits, Events } = require("discord.js");
const logger = require("./utils/logger");
const errorHandler = require("./utils/errorHandler");

const tamil = require("./commands/tamil");
const roast = require("./commands/roast");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, () => {
  logger.info(`✅ Bot Online as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === "tamil") {
        await tamil(interaction);
      }

      if (interaction.commandName === "roast") {
        await roast(interaction);
      }
    }

    if (interaction.isButton()) {
      if (interaction.customId === "next") {
        await interaction.reply({
          content: "➡️ Next question coming soon!",
          ephemeral: true,
        });
      }

      if (interaction.customId === "end") {
        await interaction.reply({
          content: "❌ Quiz ended. Thanks for playing!",
          ephemeral: true,
        });
      }
    }
  } catch (error) {
    await errorHandler(error, interaction);
  }
});

client.login(process.env.DISCORD_TOKEN);
