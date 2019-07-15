exports.run = (bot, message, args) => {
    const discord = require("discord.js")

    let User = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!User) return message.reply("**:x:** __**Erreur...**__**, Vous devez mentionner un utilisateur !**");
    let reason = args[1];
    console.log("After met")
    let muted = message.guild.roles.find(`name`, "MUET");
    if(!User.roles.has(muted.id)) return message.reply("**:x:** __**Erreur...**__**, `${member.user.username}` N'est pas muet !**");
    await(User.removeRole(muted.id));

    let embed = new discord.RichEmbed()
    .setDescription($(message.author.username)`Unmute ${User}`)
    .setColor("#cd460b")
    .addField("Joueur unmute", User)
    .addField("Unmute par", message.author.username)
    .addField("Raison", reason)
    let logchannel = message.guild.channel.find(c=> c.name === "❌sanctions❌")

    logchannel.send(embed)
    console.log("after embed")
    }

exports.help = {
    name: "unmute"
}
