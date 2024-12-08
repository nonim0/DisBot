const { Events, Collection, MessageFlags, RoleFlagsBitField } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const default_role = await member.guild.roles.cache.find((role) => {return role.name === 'Aliados Jr.'});
        const welcome_channel = await member.guild.channels.cache.find((channel) => {return channel.name === 'bienvenida'}).fetch();
        // welcome_channel.fetch();
        try {
            await member.roles.add(default_role)
            await welcome_channel.send(`welcome to the alliance ${member.user}`)
        } catch(error){console.error(error)}
        
    //    await interaction.reply(interaction)
    }
};
