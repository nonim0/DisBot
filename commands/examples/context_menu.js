const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('user information')
        .setType(ApplicationCommandType.User),
    async execute(interaction) {}
}
