const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = (client, message, args) => {
        let mutedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!mutedUser) {
            return message.channel.send("**:x:** __**Erreur...**__**, Vous devez mentionner un utilisateur !**")
        }
        let muteReason = args.join(' ').clice(30)
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("**:x:** __**Erreur...**__**, Vous n'avez pas la permission !**")
        }
        if (mutedUser.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("**:x:** __**Erreur...**__**, Vous ne pouvez pas rendre muet cette utilisateur !**")
        }
        let muteRole = message.guild.roles.Find(`name`, "MUET");


        if (!muteRole) {
            try{
                muteRole = message.guild.createRole({
                name: 'MUET',
                color: "#fff",
                permissions: []
                });

            message.guild.channels.forEach( async (channel, ID) => {
                channel.overwritePermissions(muteRole, {
                    SEND_MESSAGE: false,
                    ADD_REACTIONS: false,
                })
            })
        } catch(e){console.log(e.stack)};
        }
        
        let muteTime = args[1];
        if (!muteTime) return message.channel.send("**:x:** __**Erreur...**__**, Vous devez spécifier la durée !**")

        mutedUser.addRole(muteRole.id);

        setTimeout(() => {
            mutedUser.removeRole(muteRole.id);
            muteChannel.send(unmuteEmbed);
        }, ms(muteTime));

            let muteEmbed = new Discord.RichEmbed()
            .setDescription("Mute")
            .setColor("#cd460b")
            .addField("Utilisateur Muet : ", `${mutedUser}`)
            .addField("Mute par : ", `${message.author}`)
            .addField("Mute pendant : ", `${muteTime}`)
            .addField("Raison : ", muteReason)
            .setTimestamp();

            let muteChannel = message.guild.channels.Find('name', "❌sanctions❌")
            if (!muteChannel) {
                return message.channel.send("**:x:** __**Erreur...**__**, Salon de Sanctions introuvable !**")
            };

            message.guild.member(mutedUser)
            muteChannel.send(muteEmbed)

            let unmuteEmbed = new Discord.RichEmbed()
            .setDescription("Unmute")
            .setColor("#cd460b")
            .addField("Utilisateur Unmute : ", `${mutedUser}`)
            .addField("Raison du unmute : ", "Temps de mute dépassé")
            .addField("Etait mute par : ", `${message.author}`)
            .addField("Etait mute pendant : ", `${muteTime}`)
            .addField("Avait été mute pour : ", muteReason)
            .setTimestamp();
            message.guild.member(mutedUser)
    }

module.exports.help = {
    name: 'mute'
};
