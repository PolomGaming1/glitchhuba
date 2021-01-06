const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "serverinfo",
  aliases: ["serverinformation"],
  description: "Show Server Information!",
  usage: "Serverinfo",
  run: async (client, message, args) => {
    //Start
    message.delete();
    const guild = message.guild;
    const Emojis = guild.emojis.cache.size || "No Emoji!";
    const Roles = guild.roles.cache.size || "No Roles!";
    const Members = guild.memberCount;
    const Humans = guild.members.cache.filter(member => !member.user.bot).size;
    const Bots = guild.members.cache.filter(member => member.user.bot).size;

    const embed = new MessageEmbed()
      .setTitle(guild.name + " Informace!")
      .setColor(Color)
      .setThumbnail(guild.iconURL())
      .addField(`Name`, guild.name, true)
      .addField(`ID`, `${guild.id}`, true)
      .addField(`Owner`, `${guild.owner.user.tag}`, true)
      .addField(`Numbers of roles!`, Roles, true)
      .addField(`Number emojis`, Emojis, true)
      .addField(`Account players`, Members, true)
      .addField(`Account bots`, Bots, true)
      .addField(`Server has been created in`, guild.createdAt.toDateString())
      .setFooter(` ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};