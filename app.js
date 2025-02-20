// REQUIRES
const dotenv = require('dotenv'); dotenv.config();
const fs = require('node:fs');
const path = require('node:path')
const express = require('express');
const { Client, Collection, GatewayIntentBits  } = require('discord.js');
const {Guilds, GuildMembers, GuildMessages, MessageContent, GuildMessageReactions } = GatewayIntentBits;
const { TOKEN, PUERTO } = process.env


// APP EXPRESS;
const app = express();
// CLIENTE DISCORD;
const client = new Client({intents: [Guilds, GuildMembers, MessageContent, GuildMessages, GuildMessageReactions]});
client.commands = new Collection();



// COMMANDS HANDLER // CONTROLADOR DE COMANDOS;
const folders_path = path.join(__dirname, 'commands');
const command_folder = fs.readdirSync(folders_path);
for(const folder of command_folder) {
    const commands_path = path.join(folders_path, folder);
    const command_files = fs.readdirSync(commands_path).filter((file) => { return file.endsWith('.js')});
    for (const file of command_files){
        const file_path = path.join(commands_path, file)
        const command = require(file_path);
        if ('data' in command && 'execute' in command) {client.commands.set(command.data.name, command)}
             else { console.log(`[WARNING] the command at ${file_path} is missing a required 'data' or 'execute' property`)};
    };
};
// EVENTS HANDLER // CONTROLADOR DE EVENTOS;
const events_path = path.join(__dirname, 'events');
const event_files = fs.readdirSync(events_path).filter((file) => {return file.endsWith('.js')});
for (const file of event_files) {
    const file_path = path.join(events_path, file);
    const event = require(file_path)
    if(event.once) {client.once(event.name, (...args) => {  event.execute(...args)})}
        else { client.on(event.name, (...args) => { event.execute(...args)})}
};





// CONECTAR;
app.listen(PUERTO, ()=>{
    client.login(TOKEN);
    console.log('conectado:', PUERTO )
});
 

























// import 'dotenv/config';
// import express from 'express';
// import {InteractionType, InteractionResponseType, verifyKeyMiddleware, verifyKey} from 'discord-interactions';
// import { REST, Routes, Client, GatewayIntentBits,Events, SlashCommandBuilder } from 'discord.js';
// import './commands/utility/pingo.cjs';



// app.route('/interactions')
// .get((dem, res) => {

// }).post(verifyKeyMiddleware(process.env.PUBLIC_KEY), async (dem, res) => {
//     // Interaction type and data
//   const { type, data } = dem.body;

//   /**
//    * Handle verification requests
//    */
//   if (type === InteractionType.PING) {
//     return res.send({ type: InteractionResponseType.PONG });
//   }

//   /**
//    * Handle slash command requests
//    * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
//    */
//   if (type === InteractionType.APPLICATION_COMMAND) {
//     const { name } = data;

//     // "test" command
//     if (name === 'test') {
//       // Send a mensaje into the channel where command was triggered from
//       return res.send({
//         type: InteractionResponseType.CHANNEL_mensaje_WITH_SOURCE,
//         data: {
//           // Fetches a random emoji to send from a helper function
//           content: `hello world ${getRandomEmoji()}`,
//         },
//       });
//     }

//     console.error(`unknown command: ${name}`);
//     return res.status(400).json({ error: 'unknown command' });
//   }

//   console.error('unknown interaction type', type);
//   return res.status(400).json({ error: 'unknown interaction type' });
    
// }).put((dem, res) => {

// }).patch((dem, res) => {

// }).delete((dem, res) => {

// });


// app.listen(process.env.PUERTO, () => {
//     console.log('conectado...');
// })

