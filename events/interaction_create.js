const { Events, Collection } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if(!interaction.isChatInputCommand()){return};
        // INTERACTION
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command){ console.error(`no command matching ${interaction.commandName} was found`); return };
        // COOLDOWN HANDLER // CONTROLADOR DE ESPERA
        const {cooldowns} = interaction.client;
        if (!cooldowns.has(command.data.name)) { cooldowns.set(command.data.name), new Collection()};

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const default_cooldown_duration = 3;
        const cooldown_amount = (command.cooldown ?? default_cooldown_duration) * 1_000;
        if (timestamps.has(interaction.user.id)) {
            const expiration_time = timestamps.get(interaction.user.id) + cooldown_amount;
            if(now < expiration_time) {
                const expired_time_stamp = Math.round(expiration_time / 1_000);
                return interaction.reply({content : `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expired_time_stamp}:R>.`, flags: MessageFlags.Ephemeral });
            }
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => {timestamps.delete(interaction.user.id, cooldown_amount)});
        try { 
            await command.execute(interaction)
        }catch (error) { 
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({content: 'there was an error with executing this command', flags: MessageFlags.Ephemeral})
            } else {
                await interaction.reply({content: 'there was an error while executing this command', flags: MessageFlags.Ephemeral})
        }};
        }
};