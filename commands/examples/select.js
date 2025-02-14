const { UserSelectMenuBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('select')
        .setDescription('select an option'),
    async execute(interaction) {
        const string_select = new StringSelectMenuBuilder()
            .setCustomId('starter')
            .setPlaceholder('make a selection')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('bull')
                    .setDescription('type: grass/poison')
                    .setValue('bull')
                    .setDefault(true),
                new StringSelectMenuOptionBuilder()
                    .setLabel('char')
                    .setDescription('type: fire')
                    .setValue('char'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('squi')
                    .setDescription('type: water')
                    .setValue('squi'))
        const user_select = new UserSelectMenuBuilder()
                .setCustomId('users')
                .setPlaceholder('select multiple users')
                .setMinValues(1)
                .setMaxValues(2)
        const row = new ActionRowBuilder().addComponents(string_select);
        const row_1 = new ActionRowBuilder().addComponents(user_select)
        await interaction.reply({content: 'choose your starter',components: [row, row_1]})
    }
}