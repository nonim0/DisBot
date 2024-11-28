import 'dotenv/config';
import express from 'express';
import { getRandomEmoji } from './utils.js';
import {InteractionType, InteractionResponseType, verifyKeyMiddleware, verifyKey} from 'discord-interactions';
import { REST, Routes, Client, GatewayIntentBits,Events } from 'discord.js';
import { saluda } from './commands/saluda.js';




const app = express();
const rest = new REST({version:'10'}).setToken(process.env.DISCORD_TOKEN);
const client = new Client({intents: 53608447});


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

client.on(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.username}!`);
});


client.on(Events.MessageCreate, async (mensaje) => {
    const argumentos = mensaje.content.slice(1).split(' ')[0];
    if(mensaje.author.bot) {return}
    if (!mensaje.content.startsWith('-')) {return}
    try {
        saluda.run(mensaje)
    } catch (error) {
        console.log(`ha ocurido un error -${argumentos}`, error.message);
    }
    // if(argumentos === 'hola') {mensaje.reply('que tal?')}
    
  });




client.login(process.env.DISCORD_TOKEN)



const puerto = process.env.PUERTO || 3000
app.listen(puerto, () => {
    console.log('conectado...');
})
