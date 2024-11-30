const { Events } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    execute(message) {
        const argumentos = message.content.slice(1).split(' ')[0];
        if(message.author.bot) {return}
        if (!message.content.startsWith('-')) {return}
        try {message.reply(message)} 
            catch (error) {console.log(`ha ocurido un error -${argumentos}`, error.message)};
        // if(argumentos === 'hola') {mensaje.reply('que tal?')}
    }
};