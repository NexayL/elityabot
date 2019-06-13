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

	if (command === `${prefix}mute`) {
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
				await channel.overwritePermissions(muteRole, {
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
});

client.login(process.env.TOKEN);
