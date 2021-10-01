const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Nenhuma música tocando agora ${message.author}... tente novamente? ❌`);

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send(`Você deve primeiro desabilitar a música atual no modo de loop (${client.config.app.px}loop) ${message.author}... tente novamente? ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Modo de repetição **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** Toda a fila será repetida indefinidamente 🔁` : `Algo deu errado ${message.author}... tente novamente? ❌`);
        } else {
            if (queue.repeatMode === 2) return message.channel.send(`You must first disable the current queue in the loop mode (${client.config.app.px}loop queue) ${message.author}... try again ? ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Modo de repetição **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** a música atual será repetida indefinidamente (você pode repetir a fila com a opção <queue>) 🔂` : `Algo deu errado $ {message.author} ... tente novamente? ❌`);
        };
    },
};