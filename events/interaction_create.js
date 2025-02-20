const { Events, MessageFlags, EmbedBuilder } = require("discord.js");

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
            if (interaction.customId === 'welcome_modal') {
                const { name } = interaction.guild.name;
                const alliance_name = name;
                const game_name = interaction.fields.getTextInputValue('game_name');
                const country = interaction.fields.getTextInputValue('country');
                const time_zone = interaction.fields.getTextInputValue('time_zone')
                const language_1 = interaction.fields.getTextInputValue('language_1');
                const language_2 = interaction.fields.getTextInputValue('language_2')

                const welcome_embed = new EmbedBuilder()
                    .setColor(0xcfeb34)
                    .setTitle(`Welcome to ${ alliance_name } [TnP]${ game_name }.`)
                    .setDescription('Here are some helpful recommendations:')
                    .addFields(
                        {name: '🧭 Relocate:', value: 'Relocate near alliance territory/stronghold.', inline: true},
                        {name: '♻️ Donate:', value: 'Minimum 10 daily donations to alliance technology.', inline: true}
                    )
                    .addFields({name: '📈 Grow:', value: 'Concentrate on dailies, gathering L4/higher(when available) resources and alliance mine at the moment, set builds and army growth. Attack common tribes regularly to gain EXP books, alliance founds, and more.'})
                    // .setTimestamp()
                    .setFooter({text: 'Leader'});
                await interaction.reply({ embeds:[welcome_embed] })
            };
        } else if (interaction.isUserContextMenuCommand()){
            const { username } = interaction.targetUser
            if (username) {await interaction.reply(username)}
        };
    }
};