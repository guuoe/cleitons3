module.exports = {
    name: 'clear',
    aliases: ['cq'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Nenhuma música tocando no momento ${message.author}... tente novamente ❌`);

        if (!queue.tracks[0]) return message.channel.send(`Nenhuma música na fila após a atual ${message.author}... tente novamente ❌`);

        await queue.clear();

        message.channel.send(`As músicas da filas foram apagadas. 🗑️`);
    },
};