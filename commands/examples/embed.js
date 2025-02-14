const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('send embed'),
    async execute(interaction) {
        const example_embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('some title')
                .setAuthor({name: 'some name'})
                .setDescription('some description here')
                .addFields(
                    {name: 'regular field title', value: 'some value here'},
                    {name: '\u200B', value: '\u200B'},
                    {name: 'inline field title', value: 'some value here', inline: true}
                )
                .addFields({name: 'inline field title', value: 'some value here', inline: true})
                .setTimestamp()
                .setFooter({text: 'some footer text here'});
        await interaction.send({embeds: [example_embed]})
    }
};
