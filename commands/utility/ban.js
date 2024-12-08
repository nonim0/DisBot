const { SlashCommandBuilder, InteractionContextType, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('select a menber and ban them')
        .addUserOption((option)=> {
            return option.setName('target')
                .setDescription('the member to ban')
                .setRequired(true)})
        .addStringOption((option) => {
            return option.setName('reason')
                .setDescription('the reason of banning')})
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setContexts(InteractionContextType.Guild),
    async execute(interaction){
        const target = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason') ?? 'no reason provided'

        const confirm = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('confirm ban')
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true);
        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('cancel')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(confirm, cancel);

        await interaction.reply({
            content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
            components: [row]
        })
        // await interaction.guild.members.ban(target) 
    }
};