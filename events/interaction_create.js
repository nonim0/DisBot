const { Events, MessageFlags } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            // CHAT-INPUT HANDLER
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) { console.error(`no command matching ${interaction.commandName} was found`); return };
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
            if (interaction.customId === 'type of rally') {
                try {await interaction.reply({content: 'done'}) }
                catch (error) {console.error(error)};
            };
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId === 'game name') {await interaction.reply({content: 'Your submission was received successfully!' })};
            const submited_game_name = interaction.fields.getTextInputValue('game_name_input')
            console.log(submited_game_name)
        } else if (interaction.isUserContextMenuCommand()){
            const { username } = interaction.targetUser
            if (username) {await interaction.reply(username)}
        };
    }
};