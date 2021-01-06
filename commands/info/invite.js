const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: 'invite',
  description: 'invite',
  aliases: [], //no aliases
  run: async (bot, message, args) => {
   
    //Start
    message.delete();  

  let bicon = bot.user.displayAvatarURL;
  
 let inviteEmbed = new Discord.MessageEmbed()

 .setColor("YELLOW")
 .setThumbnail(bicon)
 .addField("*Invite bot url*", "https://discord.com/api/oauth2/authorize?client_id=794903536700751918&permissions=8&scope=bot")
 .setFooter(`${message.author.username}`)
 .setTimestamp();

 message.channel.send(inviteEmbed);


        message.delete();
 
  }
}