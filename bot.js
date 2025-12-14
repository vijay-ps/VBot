require("dotenv").config();
const { Client, GatewayIntentBits, Events } = require("discord.js");

const tamil = require("./commands/tamil");
const roast = require("./commands/roast");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot Online as ${client.user.tag}`);
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
    console.error("Interaction Error:", error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "⚠️ Something went wrong. Please try again.",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "⚠️ Something went wrong. Please try again.",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
