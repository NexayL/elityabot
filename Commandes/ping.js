const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
    
    let début = Date.now();
    await message.channel.send("Ping").then(async(m) => await m.edit(`**:warning: Vous avez un délai de** __**${Date.now() - début}**__ **ms :warning:**`));
};

module.exports.help = {
    name: "ping"
}