const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) { return message.channel.send('**:x:** __**Erreur...**__**, Vous n\'avez pas la permission !**'); }
    if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) { return message.channel.send('**:x:** __**Erreur...**__**, Le bot n\'a pas la permission !**'); }
    if (message.mentions.users.size === 0) { return message.channel.send('**:x:** __**Erreur...**__**, Vous devez mentionner un utilisateur !**'); }

        let banMember = message.guild.member(message.mentions.users.first());
        if (!banMember) { return message.channel.send('**:x:** __**Erreur...**__**, Je n\'ai pas trouvé l\'utilisateur !**'); }
    
        message.mentions.users.first().send(`Vous êtes banni du serveur **${message.guild.name}** par ${message.author.username}`)
            .then(() => {
                banMember.ban()
                    .then((member) => {
                        message.channel.send(`**:warning:** __**${member.user.username}**__ **a été banni du serveur ! Par** __**${message.author.username}**__ **:warning:**`);
                    })
                        .catch((err) => {
                            if (err) { return console.error(err); }
                        });
            })
                .catch((error) => {
                    if (error) { console.error(error); }
                        banMember.ban()
                            .then((member) => {
                                message.channel.send(`**:warning:** __**${member.user.username}**__ **a été banni du serveur ! Par** __**${message.author.username}**__ **:warning:**`);
                            })
                                .catch((err) => {
                                    if (err) { return console.error(err); }
                                });
                });
};

module.exports.help = {
    name: 'ban'
};
