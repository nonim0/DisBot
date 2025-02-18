const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        const { channels } = member.guild;
        const { username } = member.user;
        const report_channel = await channels.cache.find((channel) => {return channel.name === 'oracle-board'}).fetch();
        const removed_member_username = username
        const exit_embed = new EmbedBuilder()
                .setColor(0xcfeb34)
                .setTitle(`Kick/Ban report.`)
                .setDescription('these member has been kicked/banned from the server:')
                .addFields(
                    {name: 'Username:', value: `${removed_member_username}`})
                .setTimestamp()
                .setFooter({text: 'Admin'});
        try {
            await report_channel.send({ embeds:[exit_embed]})
        } catch(error){console.error(error)};
        
    }
};
