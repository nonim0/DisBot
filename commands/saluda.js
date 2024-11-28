export const saluda = {
    name: 'saluda',
    description: 'Repite los argumentos dados',
    run: async (mensaje) => {
        const argumentos = mensaje.content.split(' ').slice(1).join(' ');
        if (argumentos.length < 1) {return mensaje.reply('provee un argumento valido.')};
        mensaje.reply(argumentos)
    }
}

