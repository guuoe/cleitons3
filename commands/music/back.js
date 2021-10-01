module.exports = {
    name: 'back',
    aliases: ['previous'],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Nenhuma música tocando no momento ${message.author}... tente novamente ❌`);

        if (!queue.previousTracks[1]) return message.channel.send(`Nenhuma música foi reproduzida antes ${message.author}... tente novamente ❌`);

        await queue.back();

        message.channel.send(`Tocando a musica **previous** ✅`);
    },
};