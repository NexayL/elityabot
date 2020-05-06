const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    message.channel.send({
        embed: {
            color: 0xe43333,
            title: `__**Voici les commandes d'aides**__`,
            thumbnail: {
                //url: `https://media.discordapp.net/attachments/613458298712096788/707405524265861150/logo.png`
                url: `https://media.discordapp.net/attachments/613458298712096788/707406748339666994/meave-logo.png`
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
                    name: ':white_check_mark: ?serverinfo <@exemple#123>',
                    value: "**Permet d'avoir quelques informations sur Elitya**"
                },
                {
                    name: ':white_check_mark: ?botinfo <@exemple#123>',
                    value: "**Permet d'avoir quelques informations sur ElityaBot**"
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
                    name: ':warning: ?mute <@exemple#123> <durée (1s/m/h/d)>',
                    value: "**Permet de rendre muet une personne pendant une durée définie** __**(Modération)**__"
                },
               {
                    name: ':warning: ?unmute <@exemple#123> <durée (1s/m/h/d)>',
                    value: "**Permet de rendre la parole une personne pendant une durée définie** __**(Modération)**__"
                },
                {
                    name: ':warning: ?ban <@exemple#123>',
                    value: "**Permet de bannir une personne du serveur** __**(Modération)**__"
                },
                {
                    name: ':warning: ?warn <@exemple#123>',
                    value: "**Permet de mettre un avertissement à une personne du serveur** __**(Modération)**__"
                },
                {
                    name: ':warning: ?unwarn <@exemple#123>',
                    value: "**Permet d'enlever un avertissement à une personne du serveur** __**(Modération)**__"
                },
                {
                    name: ':warning: ?infractions <@exemple#123>',
                    value: "**Permet de voir les avertissements d'une personne du serveur** __**(Modération)**__"
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
