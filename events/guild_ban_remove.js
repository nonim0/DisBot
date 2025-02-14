const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.GuildBanRemove,
    async execute(member) {
        console.log(member)
        const { channels } = member.guild;
        const { username } = member.user;
        const welcome_channel = await channels.cache.find((channel) => {return channel.name === 'welcome'}).fetch();
        const unbanned_member_username = username
        const ban_remove_embed = new EmbedBuilder()
                .setColor(0xcfeb34)
                .setTitle(`ban remove report.`)
                .setDescription('Here are some helpful recommendations:')
                .addFields(
                    // {name: '🧭 Relocate:', value: 'Relocate near alliance territory/stronghold.', inline: true},
                    // {name: '♻️ Donate:', value: 'Minimum 10 daily donations to alliance technology.', inline: true}
                )
                .addFields({name: '📈 Grow:', value: 'Concentrate on dailies, gathering L4/higher(when available) resources and alliance mine at the moment, set builds and army growth. Attack common tribes regularly to gain EXP books, alliance founds, and more.'})
                // .setTimestamp()
                .setFooter({text: 'Admin'});
        try {
            await welcome_channel.send({embeds:[ban_remove_embed]})
        } catch(error){console.error(error)};
        
    }
};