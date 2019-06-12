const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    message.channel.send({
        embed: {
            color: 0xe43333,
            title: `__**Voici les commandes d'aides**__`,
            thumbnail: {
                url: `https://cdn.discordapp.com/attachments/577894860661719040/584012517211111435/testtt.png`
            },
            fields: [
                {
                    name: ':white_check_mark: ?help',
                    value: "**Voir les commandes d'aides**"
                },
                {
                    name: ':white_check_mark: ?ping',
                    value: "**Permet de voir son ping (latence en millisecondes)**"
                },
                {
                    name: ':white_check_mark: ?stats <@exemple#123>',
                    value: "**Permet de voir les statistiques d'un utilisateur**"
                },
                {
                    name: ':warning: ?clear <nmb de msg>',
                    value: "**Permet de supprimer un nombre de messages définis** __**(Modération)**__"
                },
                {
                    name: ':warning: ?kick <@exemple#123>',
                    value: "**Permet d'éjecter une personne du serveur** __**(Modération)**__"
                },
                {
                    name: ':warning: ?ban <@exemple#123>',
                    value: "**Permet de bannir une personne du serveur** __**(Modération)**__"
                }
            ],
            footer: {
                text: `ElityaBOT développé par Nexay`
            }
        }
    });
};

module.exports.help = {
    name: 'help'
};