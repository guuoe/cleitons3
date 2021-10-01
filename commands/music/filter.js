module.exports = {
    name: 'filter',
    aliases: [],
    utilisation: '{prefix}filter [filter name]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Nenhuma musica tocando agora ${message.author}... tente novamente? ❌`);

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) return message.channel.send(`Especifique um filtro válido para habilitar ou desabilitar ${message.author}... tente novamente? ❌\n${actualFilter ? `Filtro atualmente ativo ${actualFilter} (${client.config.app.px}filtro ${actualFilter} para desativá-lo).\n` : ''}`);

        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.channel.send(`Este filtro não existe  ${message.author}... tente novamente? ❌\n${actualFilter ? `Filtro atualmente ativo ${actualFilter}.\n` : ''}Lista de filtros disponíveis ${filters.map(x => `**${x}**`).join(', ')}.`);

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.channel.send(`O filtro ${filter} agora é **${queue.getFiltersEnabled().includes(filter) ? 'enabled' : 'disabled'}** ✅\n*Lembrete quanto mais longa a música, mais tempo demorará.*`);
    },
};