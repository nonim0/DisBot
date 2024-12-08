const dotenv = require('dotenv');
dotenv.config();
const { REST, Routes } = require('discord.js');


const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);
// BORRAR 1 COMANDO
// GUILD SCOPE
// rest.delete(Routes.applicationGuildCommand(process.env.APP_ID, process.env.GUILD_ID, process.env.COMMAND_ID))
//     .then(() => {console.log('comando borrado corectamente')})
//     .catch(console.error);
// GLOBAL SCOPE
// rest.delete(Routes.applicationCommand(process.env.APP_ID, process.env.COMMAND_ID))
//     .then(() => {console.log('commando borrado correctamente')})
//     .catch(console.error);
// BORRAR TODOS LOS COMANDOS
// GUILD SCOPE
// rest.put(Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID), {body: []})
//     .then(() => {console.log('comandos borrados corectamente')})
//     .catch(console.error);
// GLOBAL SCOPE 
rest.put(Routes.applicationCommands(process.env.APP_ID), {body: []})
    .then(() => {console.log('commandos borrados correctamente')})
    .catch(console.error);