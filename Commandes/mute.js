const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("**:x:** __**Erreur...**__**, Vous devez mentionner un utilisateur !**");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("**:x:** __**Erreur...**__**, Vous ne pouvez pas rendre muet cet utilisateur !**");
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
  if(!mutetime) return message.reply("**:x:** __**Erreur...**__**, Vous devez spécifier la durée ! (?mute @user 1s/m/h/d)**");
  
  let muteembed = new Discord.RichEmbed()
  .setDescription(`Muté par ${message.author}`)
  .setColor("#cd460b")
  .addField("Joueur muet", tomute)
  .addField("a été muté dans", message.channel)
  .addField("Muet pendant", mutetime)

  let channel = message.guild.channels.find(c => c.name === "❌sanctions❌");
  if(!channel) return message.channel.send("**:x:** __**Erreur...**__**, Salon de Sanctions introuvable !**");
  channel.send(muteembed);
  
  //message.reply(`<@${tomute.id}> a été muté pendant ${ms(ms(mutetime))}`);
  
  await(tomute.addRole(muterole.id));
  
  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> a été unmute !`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}
