const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('get info about a user or a server')
        .addSubcommand((subcommand) => {
            return subcommand.setName('user')
                .setDescription('info about a user')
                .addUserOption((option) => {
                    return option.setName('target')
                        .setDescription('the user')});})
        .addSubcommand((subcommand) => {
            return subcommand.setName('server')
                .setDescription('info about the server');}),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target')
            if(user) { await interaction.reply(`Username: ${user.username}\nID: ${user.id}`)}
                else {await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`)}
        } else if (interaction.options.getSubcommand() === 'server') { await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)}
    }
};