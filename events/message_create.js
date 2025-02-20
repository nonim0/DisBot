const { Events } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: Events.MessageCreate,
    emit: true,
    async execute(message) {
        let fetched;
        const { channels } = message.guild;
        const welcome_channel = await channels.cache.find((channel) => channel.name === 'welcome').fetch();
        const report_channel = await channels.cache.find((channel) => channel.name === 'oracle-board').fetch();
        if (message.content.toLowerCase() === 'limpiar') {
            if (message.channel.name === 'oracle-board' ) {
                fetched = await report_channel.messages.fetch({limit: 99})
            } else if (message.channel.name === 'welcome') { 
                fetched = await welcome_channel.messages.fetch({limit: 99})};
            await wait(2_000)
            await message.delete();
            await message.channel.bulkDelete(fetched);
        };
        if (message.components.length > 0 && message.author.bot === true ){
            const fetched = await welcome_channel.messages.fetch(message.id)
            await wait(15_000)
            await welcome_channel.messages.delete(fetched)
        };
        // const argumentos = message.content.slice(1).split(' ')[0];
        // if(message.author.bot) {return}
        // if (!message.content.startsWith('-')){return}
        // try {await message.reply(message)} 
            // catch (error) {console.log(`ha ocurido un error -${argumentos}`, error.message)};
        // if(argumentos === 'hola') {mensaje.reply('que tal?')}
    }
};