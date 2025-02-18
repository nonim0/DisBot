const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('welcome_modal')
            .setDescription('Welcome modal'),
    async execute(interaction) {
        const welcome_modal = new ModalBuilder()
                .setCustomId('welcome_modal')
                .setTitle('Welcome Modal');
        const game_name_input = new TextInputBuilder()
        .setCustomId('game_name')
        .setLabel('Whats your AOEM User Name')
        .setStyle(TextInputStyle.Short);

        const first_action_row = new ActionRowBuilder().addComponents(game_name_input);
        welcome_modal.addComponents(first_action_row);
        await interaction.showModal(welcome_modal);
    }   
}