const { SlashCommandBuilder, InteractionContextType, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType, MessageFlags  } = require("discord.js");


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

        const confirm = new ButtonBuilder()
                .setCustomId('confirm')
                .setLabel('confirm')
                .setStyle(ButtonStyle.Danger);

        const cancel = new ButtonBuilder()
                .setCustomId('cancel')
                .setLabel('cancel')
                .setStyle(ButtonStyle.Secondary);
        
        const row = new ActionRowBuilder().addComponents(confirm, cancel)

        const response = await interaction.reply({
            content: `Are you sure you want to kick ${target} for reason: ${reason}?`,
            components: [row],
            fetchReply: true,
            flags: MessageFlags.Ephemeral});
        async function collector_filter(i) {
            if (i.user.id === interaction.user.id){ return i.user.id === interaction.user.id }
                else { await i.reply({ content: `these buttons aren't for you`, flags: MessageFlags.Ephemeral})}};
        const collector = response.createMessageComponentCollector({filter:collector_filter, ComponentType: ComponentType.Button, time: 15_000});
        collector.on('collect', async (i) => {
            if (i.customId === 'confirm') {
                try {
                    await i.update({content: `${target} has been kicked for reason: ${reason}`,components: [], flags: MessageFlags.Ephemeral, fetchReply: true})
                    await interaction.guild.members.kick(target)
                } catch (error) {console.error(error)}
            } else if (i.customId === 'cancel') {
                await i.update({content: 'action cancelled', components: [], flags: MessageFlags.Ephemeral})};
        });
        collector.on('end', async (collected) => {console.log(`collected ${collected.size} interactions.`)});
        
        
    }
};














// try {
//     // const confirmation = await response.awaitMessageComponent({filter: collector_filter, time: 60_000})
//     // if (confirmation.customId === 'confirm') {
//     //     await confirmation.update({content: `${target} has been kicked for reason: ${reason}`,components: []})
//     //     // await interaction.guild.members.kick(target)
//     // } else if (confirmation.customId === 'cancel') {await confirmation.update({content: 'action cancelled', components: []})}
// } catch (error) {await interaction.editReply({content: 'confirmation not received within 1 minute, canceling', components: []}) }