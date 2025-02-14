const wait = require('node:timers/promises').setTimeout;
const { UserSelectMenuBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rally_invite')
        .setDescription('invite members to start a rally'),
    async execute(interaction) {
        const rally_select = new StringSelectMenuBuilder()
                .setCustomId('type of rally')
                .setPlaceholder('chose a rally type ')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel('flag rally')
                        .setDescription('flag rally')
                        .setValue('flag rally'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('player rally')
                        .setDescription('player rally')
                        .setValue('player rally'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('event rally')
                        .setDescription('events rally')
                        .setValue('events rally'))
        const row = new ActionRowBuilder().addComponents(rally_select)

        await interaction.reply({content: `choose a type of rally`, components: [row]})
        await wait(10_000)
        await interaction.deleteReply()
    }

};