const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('replies with your input')
        .addStringOption((option) => {
            return option.setName('input')
                .setDescription('the input to echo back')
                .setMaxLength(2_000)
                .setRequired(true)
                .addChoices({name: 'funny', value:'gif_funny'}, {name: 'meme', value:'gif_meme'})})
        .addChannelOption((option) => {
            return option.setName('channel')
                .setDescription('the channel to echo into')
                .addChannelTypes(ChannelType.GuildText)})
        .addBooleanOption((option) => {
            return option.setName('ephemeral')
                .setDescription('whether or not the echo should be ephemeral')}),
    async execute(interaction) {}
    };