const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('game_name')
        .setDescription('enter game name'),
    async execute(interaction) {
        const modal_game_name = new ModalBuilder()
                            .setCustomId('game name')
                            .setTitle('game name');
        const game_name_input = new TextInputBuilder()
            .setCustomId('game_name_input')
            .setLabel('whats your AOEM game name?')
            .setStyle(TextInputStyle.Short);
        
        const row = new ActionRowBuilder().addComponents(game_name_input);
        
        modal_game_name.addComponents(row);
        await interaction.showModal(modal_game_name)
    }
};



