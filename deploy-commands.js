const dotenv = require('dotenv');
dotenv.config();
const fs = require('node:fs');
const path = require('node:path');
const {REST, Routes} = require('discord.js');

const rest = new REST({version:'10'}).setToken(process.env.DISCORD_TOKEN);


const commands = []
const folders_path = path.join(__dirname, 'commands');
const command_folders = fs.readdirSync(folders_path);
// 
for (const folder of command_folders) {
    const commands_path = path.join(folders_path, folder);
    const command_files = fs.readdirSync(commands_path).filter((file) => { return file.endsWith('.js')});
    for (const file of command_files) {
        const file_path = path.join(commands_path, file);
        const command = require(file_path);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${file_path} is missing a required "data" or "execute" property.`);
        }
    }
};

// 
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`)
        const data = await rest.put(Routes.applicationGuildCommands(process.env.APP_ID), {body: commands});
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();