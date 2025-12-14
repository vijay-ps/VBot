require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("tamil")
    .setDescription("Tamil AI Chat")
    .addStringOption((o) =>
      o.setName("message").setDescription("Message").setRequired(true)
    ),
  new SlashCommandBuilder().setName("roast").setDescription("AI Roast"),
].map((c) => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
  .then(() => console.log("Slash commands deployed"));
