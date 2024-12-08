const { SlashCommandBuilder, InteractionContextType, PermissionFlagsBits } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('select a member and kick them')
        .addUserOption((option) => {
            return option.setName('target')
                .setDescription('the member to kick')
                .setRequired(true)})
        .addStringOption((option) => {
            return option.setName('reason')
                .setDescription('reason of kicking')})
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        const target = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason') ?? 'no reason provided';
        await interaction.reply(`kicking ${target} for ${reason}`)
        // await interaction.guild.members.kick(target)
    }
};