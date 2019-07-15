const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("**:x:** __**Erreur...**__**, Vous n'avez pas la permission !**");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("**:x:** __**Erreur...**__**, Vous devez mentionner un utilisateur !**");
  //if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("**:x:** __**Erreur...**__**, Vous ne pouvez pas rendre muet cet utilisateur !**");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("**:x:** __**Erreur...**__**, Vous devez spécifier une raison !**");

  let muterole = message.guild.roles.find(`name`, "MUET");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "MUET",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("**:x:** __**Erreur...**__**, Vous devez spécifier la durée !**");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`**:x: Vous avez été mute pendant** __**${mutetime}**__ **!**`)
  }catch(e){
    message.channel.send(`**:x: Un joueur a été muté mais il a désactivé ces messages privés, il est donc muté pendant** __**${mutetime}**__`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Muté par ${message.author}`)
  .setColor("#cd460b")
  .addField("Joueur muet", tomute)
  .addField("a été muté dans", message.channel)
  .addField("Muet pendant", mutetime)
  .addField("Raison", reason);

  let channel = message.guild.channels.find(c => c.name === "❌sanctions❌");
  if(!channel) return message.reply("**:x:** __**Erreur...**__**, Salon de Sanctions introuvable !**");
  channel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}
