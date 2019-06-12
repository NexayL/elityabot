const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) { return message.channel.send('**:x:** __**Erreur...**__**,Vous n\'avez pas la permission !**'); }
    if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) { return message.channel.send('**:x:** __**Erreur...**__**, Le bot n\'a pas la permission !**'); }
    if (message.mentions.users.size === 0) { return message.channel.send('**:x:** __**Erreur...**__**, Vous devez mentionner un utilisateur !**'); }

        let kickMember = message.guild.member(message.mentions.users.first());
        if (!kickMember) { return message.channel.send('**:x:** __**Erreur...**__**, Je n\'ai pas trouvé l\'utilisateur !**'); }
    
        message.mentions.users.first().send(`Vous êtes kick du serveur **${message.guild.name}** par ${message.author.username}`)
            .then(() => {
                kickMember.kick()
                    .then((member) => {
                        message.channel.send(`**:warning:** __**${member.user.username}**__ a été éjecté ! Par** __**${message.author.username}**__`);
                    })
                        .catch((err) => {
                            if (err) { return console.error(err); }
                        });
            })
                .catch((error) => {
                    if (error) { console.error(error); }
                        kickMember.kick()
                            .then((member) => {
                                message.channel.send(`**:warning:** __**${member.user.username}**__ **a été éjecté ! Par** __**${message.author.username}**__`);
                            })
                                .catch((err) => {
                                    if (err) { return console.error(err); }
                                });
                });
};

module.exports.help = {
    name: 'kick'
};
