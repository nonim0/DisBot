const { SlashCommandBuilder, InteractionContextType, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('select a member and ban')
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
            .setLabel('confirm')
            .setStyle(ButtonStyle.Danger);

        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('cancel')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(confirm, cancel);

        const response = await interaction.reply({
            content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
            components: [row],
            flags: MessageFlags.Ephemeral});
        async function collector_filter(i) {
            if (i.user.id === interaction.user.id) {return i.user.id === interaction.user.id}
                else {await i.reply({ content: `these buttons aren't for you`, flags: MessageFlags.Ephemeral})}};
        const collector = response.createMessageComponentCollector({filter: collector_filter, componentType: ComponentType.Button, time: 15_000});
        collector.on('collect', async (message) => {
            if (message.customId === 'confirm') {
                try {
                    await message.update({content: `${target} has been banned for reason: ${reason}`,components: [], flags: MessageFlags.Ephemeral})
                    await interaction.guild.members.ban(target)
                } catch (error) {console.error(error)}
            } else if (message.customId === 'cancel') {
                await message.update({content: 'action cancelled', components: [], flags: MessageFlags.Ephemeral})};
        });
        collector.on('end', async (collected) => {console.log(`collected ${collected.size} interactions.`)});
    }
};






















// try {
//     const confirmation = await response.awaitMessageComponent({filter: collector_filter, time: 60_000})
//     if (confirmation.customId === 'confirm') {
//         await confirmation.update({content: `${target} has been banned for reason: ${reason}`, components: []})
//         // await interaction.guild.members.ban(target) 
//     } else if (confirmation.customId === 'cancel') {await confirmation.update({content: 'action cancelled', components: []})}
// } catch (error) {await interaction.editReply({content: 'confirmation not received within 1 minute, canceling', components: []})}