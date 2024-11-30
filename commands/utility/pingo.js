const  { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pingo')
    .setDescription('Responde con pongo'),
    async execute(interaction) {await interaction.reply('pongo')}
};
