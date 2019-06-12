const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = (client, message, args) => {
    const membre = message.mentions.members.first() || message.member;
    // if (!membre) { return message.channel.send('Veuillez mentionner un utilisateur !'); }

    message.channel.send({
        embed: {
            color: 0xe43333,
            title: `Statistiques du l'utilisateur __${membre.user.username}__`,
            thumbnail: {
                url: membre.user.displayAvatarURL
            },
            fields: [
                {
                    name: '**:ballot_box_with_check: ID :**',
                    value: `__**${membre.id}**__`
                },
                {
                    name: '**:ballot_box_with_check: Crée le :**',
                    value: `__**${moment.utc(membre.user.createdAt).format("LL")}**__`
                },
                {
                    name: '**:ballot_box_with_check: joue à :**',
                    value: `__**${membre.user.presence.game ? membre.user.presence.game.name : 'Aucun jeu'}**__`
                },
                {
                    name: '**:ballot_box_with_check: A rejoint le serveur le :**',
                    value: `__**${moment.utc(membre.joinedAt).format('LL')}**__`
                }
            ],
            footer: {
                text: `Informations de l'utilisateur ${membre.user.username}`
            }
        }
    });
};

module.exports.help = {
    name: 'stats'
};
