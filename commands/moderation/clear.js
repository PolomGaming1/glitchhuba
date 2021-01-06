const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "clear",
  aliases: ["purge", "clearmsgs"],
  description: "Clear Your Messages!",
  usage: "Clear <Message Amount>",
  run: async (client, message, args) => { 
      //Start
    message.delete();

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "Ne!"
      );

    if (!args[0])
      return message.channel.send(`Please enter the number of messages you want to delete!`);

    if (isNaN(args[0]))
      return message.channel.send(`Please enter a number!`);

    if (args[0] < 4)
      return message.channel.send(
        `Ne! ${args[0]} you not have doooing!`
      );

    if (args[0] > 100)
      return message.channel.send(
        `I can't delete so many messages **( ${args[0]} )**! Because **100** messages is the limit!`
      );

    let Reason = args.slice(1).join(" ") || "Reason not given!";

    message.channel.bulkDelete(args[0]).then(Message => {
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Messages deleted!`)
        .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
        .addField(`Channel`, `${message.channel.name} (${message.channel.id}`)
        .addField(`Delete messages!`, `${Message.size}`)
        .setFooter(` ${message.author.username}`)
        .setTimestamp();
      return message.channel
        .send(embed)
        .then(msg => msg.delete({ timeout: 10000 }));
    });

    //End
  }
};