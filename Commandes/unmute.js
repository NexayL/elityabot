exports.run = (bot, message, args) => {
    const discord = require("discord.js")

    let User = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!User) return message.reply("**:x:** __**Erreur...**__**, Vous devez mentionner un utilisateur !**");
    if(!User.roles.find(r => r.name == "MUET")) { return message.channel.send("**:x:** __**Erreur...**__**, ${member.user.username} N'est pas muet !**")
    let muted = message.guild.roles.find(r => r.name === "MUET")
    (User).removeRole(muted)

    let embed = new discord.RichEmbed()
    .setDescription($(message.author.username)` Unmute ${User}`)
    .setColor("#cd460b")
    .addField("Utilisateur Unmute", User)
    .addField("Unmute par", message.author.username)
    .addField("Raison du unmute", reason)
    let logchannel = message.guild.channel.find(c=> c.name === "❌sanctions❌")

    logchannel.send(embed)
    }
}
exports.help = {
    name: "unmute"
}
