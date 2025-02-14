const { SlashCommandBuilder, MessageFlags} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('help'),
    async execute(interaction){
        const response = await interaction.reply({
            content:`help`,
            Components:[],
            flags: MessageFlags.Ephemeral })
    }
};