const { SlashCommandBuilder } = require("discord.js");
const interaction_create = require("../../events/interaction_create");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guide')
        .setDescription('search discordjs.guide')
        .addStringOption((option) => {
            return option.setName('query')
                .setDescription('phrase to search for')
                .setAutocomplete(true)})
        .addStringOption((option) => {
            return option.setName('version')
                .setDescription('version to search in')
                .setAutocomplete(true)}),
    async autocomplete(interaction) {
        const focused_option = interaction.options.getFocused(true);
        let choices;
        if(focused_option.name === 'query') { choices = ['popular topics: threads', 'sharding: getting started', 'library: voice connections']}
        if(focused_option.name === 'version') { choices = ['v9', 'v11', 'v12', 'v13', 'v14']}
        const filtered = choices.filter((choice) => { return choice.startsWith(focused_option.value)})
        await interaction.respond(filtered.map((choice) => {return {name: choice, value: choice}}));
    },
    async execute(interaction) {interaction.reply('done')}
};