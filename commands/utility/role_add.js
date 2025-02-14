const { SlashCommandBuilder, MessageFlags, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require("discord.js");

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('add_role')
        .setDescription('add role to member')
        .addUserOption((option) =>{
            return option.setName('target')
                    .setDescription('user to add role')
                    .setRequired(true)})
        .addRoleOption((option) => {
            return option.setName('role')
                    .setDescription('select a role to add')
                    .setRequired(true)})
        .addStringOption((option) => {
            return option.setName('reason')
                    .setDescription('reason for role adding')}),
    async execute(interaction) {
        const { members } = interaction.guild
        const target = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason') ??'[no reason provided]'
        const role = interaction.options.getRole('role')
        const confirm_button = new ButtonBuilder()
                        .setCustomId('confirm')
                        .setLabel('confirm')
                        .setStyle(ButtonStyle.Success);
        const cancel_button = new ButtonBuilder()
                .setCustomId('cancel')
                .setLabel('cancel')
                .setStyle(ButtonStyle.Secondary);
        const row = new ActionRowBuilder().addComponents(confirm_button, cancel_button);
        const response = await interaction.reply({
            content: `Are you sure you want to add ${role} role to ${target} for ${reason}?`,
            flags: MessageFlags.Ephemeral,
            components: [row]});
        async function collector_filter(i) {
            if (i.user.id === interaction.user.id) { return i.user.id === interaction.user.id}
                else { await i.reply({ content: `these buttons aren't for you`, flags: MessageFlags.Ephemeral})}};
        const collector = response.createMessageComponentCollector({filter: collector_filter, componentType: ComponentType.Button, time: 15_000})
        collector.on('collect', async (i) => {
            if (i.customId === 'confirm') {
                try {
                    await i.update({content: `${role} role has been added to ${target} for ${reason}.`,components: [], flags: MessageFlags.Ephemeral})
                    await members.addRole({user: target.id, role: role.id})
                } catch (error) {console.error(error)}
            } else if (i.customId === 'cancel') {
                await i.update({content: 'action cancelled', components: [], flags: MessageFlags.Ephemeral})}});
        collector.on('end', (collected) => {console.log(`collected ${collected.size} interactions.`)})
    }
};

