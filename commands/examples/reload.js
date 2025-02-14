const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('reload a command')
        .addUserOption((option) => {
            return option.setName('command')
                    .setDescription('the command to reload')
                    .setRequired(true)
            
        }),
    async execute(interaction) {
        const command_name = interaction.options.getString('command', true).toLowerCase();
        const command = interaction.client.commands.get(command_name);
        if(!command) {return interaction.reply(`There is no command with name \`${command_name}\`!`)};
        delete require.cache[require.resolve(`./${command.data.name}.js`)];
        try {
            const new_command = require(`./${command.data.name}.js`);
            interaction.client.commands.set(new_command.data.name, new_command);
            await interaction.reply(` command \`${new_command.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error)
            await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
            
        };
    },
};
