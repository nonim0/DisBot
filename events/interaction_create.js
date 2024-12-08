const { Events, Collection, MessageFlags } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // if(!interaction.isChatInputCommand() && !interaction.isAutocomplete()){return};
        if (interaction.isChatInputCommand()) {
            // CHAT-INPUT HANDLER
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command){ console.error(`no command matching ${interaction.commandName} was found`); return };
            try { 
                await command.execute(interaction)
            } catch (error) { 
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({content: 'there was an error with executing this command', flags: MessageFlags.Ephemeral})
                } else {
                    await interaction.reply({content: 'there was an error while executing this command', flags: MessageFlags.Ephemeral})
                };
            };
        } else if (interaction.isAutocomplete()) {
            // AUTO-COMPLETE HANDLER
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command){ console.error(`no command matching ${interaction.commandName} was found`); return };
            try { 
                await command.autocomplete(interaction);
            } catch (error) { 
                console.error(error);
                // if (interaction.replied || interaction.deferred) {
                //     await interaction.followUp({content: 'there was an error with executing this command', flags: MessageFlags.Ephemeral})
                // } else {
                //     await interaction.reply({content: 'there was an error while executing this command', flags: MessageFlags.Ephemeral})
                // };
            };
        } else if (interaction.isButton()) {
            // try {console.log(interaction)}
            //     catch (error) {console.error(error)};
        } else if (interaction.isStringSelectMenu()) {
            // try {console.log(interaction)}
            //     catch (error) {console.error(error)};
        } else if (interaction.isMessageComponent()) {
            // try {console.log(interaction)}
            //     catch (error) {console.error(error)}
        };
    }
};