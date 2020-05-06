const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const prefix = '?';
const ms = require('ms')

fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);
        
        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});
 
client.on("message", function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "warn") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**:x:** __**Erreur...**__**, Vous n'avez pas le permission !**")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("**:x:** __**Erreur...**__**, Vous devez mentionner un utilisateur !**")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("**:x:** __**Erreur...**__**, Vous ne pouvez pas warn ce membre !**")
        let reason = args.slice(2).join(' ')
        if (!reason) return message.channel.send("**:x:** __**Erreur...**__**, Vous devez indiquer une raison !**")
        if (!warns[member.id]) {
            warns[member.id] = []
        }
        warns[member.id].unshift({
            reason: reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        message.channel.send(member + " a été warn pour " + reason + " :white_check_mark:")
    }
 
    if (args[0].toLowerCase() === prefix + "infractions") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**:x:** __**Erreur...**__**, Vous n'avez pas le permission !**")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("**:x:** __**Erreur...**__**, Vous devez mentionner un utilisateur !**")
        let embed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .addField('10 derniers warns', ((warns[member.id] && warns[member.id].length) ? warns[member.id].slice(0, 10).map(e => e.reason) : "Ce membre n'a aucun warns"))
            .setTimestamp()
        message.channel.send(embed)
    }
})
 
client.on("message", function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    //unmute
    if (args[0].toLowerCase() === prefix + "unmute") {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**:x:** __**Erreur...**__**, Vous n'avez pas le permission !**")
        let member = message.mentions.members.first()
        if(!member) return message.channel.send("Membre introuvable")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("**:x:** __**Erreur...**__**, Vous ne pouvez pas unmute ce membre !**")
        if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("**:x:** __**Erreur...**__**, ElityaBot n'a pas la permission !**")
        let muterole = message.guild.roles.find(role => role.name === 'MUET')
        if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
        message.channel.send(member + ' a été unmute :white_check_mark:')
    }
 
    //unwarn
    if (args[0].toLowerCase() === prefix + "unwarn") {
        let member = message.mentions.members.first()
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**:x:** __**Erreur...**__**, Vous n'avez pas le permission !**")
        if(!member) return message.channel.send("Membre introuvable")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("**:x:** __**Erreur...**__**, Vous ne pouvez pas unwarn ce membre !**")
        if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("**:x:** __**Erreur...**__**, ElityaBot n'a pas la permission !**")
        if(!warns[member.id] || !warns[member.id].length) return message.channel.send("Ce membre n'a actuellement aucun warns.")
        warns[member.id].shift()
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        message.channel.send("Le dernier warn de " + member + " a été retiré :white_check_mark:")
    }
})

client.login(process.env.TOKEN);
