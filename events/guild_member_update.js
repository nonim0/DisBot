const { Events, EmbedBuilder, Collection } = require("discord.js");

module.exports = {
    name: Events.GuildMemberUpdate,
    async execute(member) {
        const {guild: { channels, roles}, user: {username}, nickname} = member
        const roless = new Collection()
        // console.log(roles)
        // const { channels, roles } = member.guild;
        // const { username } = member.user;
        // const {nickname} = member
        const nickname_previo = nickname ?? '[not provided]'
        const roles_previos = await roles.cache.find((role) => {roless.set(role.name, role)})
        const report_channel = await channels.cache.find((channel) => {return channel.name === 'report'}).fetch();
        const updated_member_username = username
        // roless.set(roles_previos)
        console.log(roless)
        const update_embed = new EmbedBuilder()
                .setColor(0xcfeb34)
                .setTitle(`User update`)
                .setDescription('these member role/nickname has been updated:')
                .addFields(
                    {name: 'Username:', value: `${updated_member_username}`},
                    {name: 'Nickname:', value: `${nickname_previo}`},
                    {name: 'Roles:', value: `${roles_previos}`}
                )
                .setTimestamp()
                .setFooter({text: 'Admin'});
        try {
            await report_channel.send({ embeds:[update_embed]})
        } catch(error){console.error(error)};
        
    }
};

1308180394981589012