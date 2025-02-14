const wait = require('node:timers/promises').setTimeout;
const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde con pong'),
    async execute(interaction) {
      
        // // await interaction.deferReply({ephemeral: true});
        await interaction.reply({content: 'pong'});
        // // const message = await interaction.fetchReply();
        await wait(2_000);
        await interaction.followUp({content: 'pong otra vez', flags: MessageFlags.Ephemeral})
        await wait(2_000);
        await interaction.editReply({content: 'otra vez pong'});
        await wait(2_000);
        await interaction.deleteReply();
    }
};
