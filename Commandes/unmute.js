const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = (client, message, args) => {
     if (command === `${prefix}umute`) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {

            let unmuteRole = message.guild.roles.Find(`name`, "MUET");
            let unmuteChannel = message.guild.channels.Find('name', "❌sanctions❌")
            let unmuteReason = args.join(' ').clice(30)
            let unmutedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let member = message.mentions.members.first();
            if (!unmutedUser) {
                return message.channel.send("**:x:** __**Erreur...**__**, Vous devez mentionner un utilisateur !**")
            }
            let uuembed = new Discord.RichEmbed()
            .setDescription("Unmute")
            .setColor("#cd460b")
            .addField("Utilisateur Unmute : ", `${unmutedUser}`)
            .addField("Raison du unmute : ", unmuteReason)
            .addField("Unmute par : ", `${message.author}`)
            .setTimestamp();
    
            if (!member.roles.find("name", "MUET")) return message.channel.send(`**:x:** __**Erreur...**__**, ${member.user.username} N'est pas muet !**`).then(m => m.delete(20000));
    
            member.removeRole(unmuteRole.id);
                
            unmuteChannel.send(uuembed);
            message.delete()
        } else {
            message.channel.send("**:x:** __**Erreur...**__**, Vous n'avez pas la permission !**")
        }


        if (!unmuteChannel) {
            return message.channel.send("**:x:** __**Erreur...**__**, Salon de Sanctions introuvable !**")
        };
    };

module.exports.help = {
    name: 'unmute'
};
