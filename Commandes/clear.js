const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) { return message.channel.send('**:x:** __**Erreur...**__**, Vous n\'avez pas les permissions !**'); }
    if (!args[0]) { return message.channel.send('**:x:** __**Erreur...**__**, Vous devez spécifier un nombre de messages à supprimer !** __**(Maximum 100)**__'); }
    else if (isNaN(args[0])) { return message.channel.send('**:x:** __**Erreur...**__**, Veuillez spécifier un nombre !** __**(Maximum 100)**__'); }
                                                                              
        message.channel.bulkDelete(args[0])
            .then((messages) => {
                message.channel.send(`__**${messages.size}**__ **messages ont été supprimés !**`);
            });
};

module.exports.help = {
    name: 'clear'
};
