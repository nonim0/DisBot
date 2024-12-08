const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("./server");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('send a random gif')
        .addStringOption((option) => {
            return option.setName('category')
                .setDescription('the gif category')
                .setRequired(true)
                .addChoices({name: 'funny', value: 'gif_funny'}, {name: 'meme', value: 'gif_meme'})}),
    async execute(interaction) {
        const category = interaction.options.getString('category')
        await interaction.reply(category)
    }
};