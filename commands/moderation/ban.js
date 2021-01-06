const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "ban",
  aliases: [],
  description: "Ban A Member!",
  usage: "Ban <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        `Ne!`
      );

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `Please mark the player you want to ban!`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`Please mark a valid player!`);

    if (Member.id === message.author.id)
      return message.channel.send(`You can't ban yourself!`);

    if (Member.id === client.user.id)
      return message.channel.send(`Please don't beat me!`);

    if (Member.id === message.guild.owner.user.id)
      return message.channel.send(`You can't ban Server Owners!`);

    let Reason = args.slice(1).join(" ");

    let User = message.guild.member(Member);

    if (!User.bannable) return message.channel.send(`I can't ban this player!`);

    try {
      console.log(`The player gets a ban!`);
      setTimeout(function() {
        User.ban({ reason: `${Reason || "Reason not given!"}` });
      }, 2000);
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Player has been baned!`)
        .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
        .addField(`Banned player`, `${Member.tag} (${Member.id})`)
        .addField(`Důvod`, `${Reason || "No reason provided!"}`)
        .setFooter(` ${message.author.username}`)
        .setTimestamp();
      if (User && Member.bot === false)
        Member.send(
          `You were banned from **${message.guild.name}** for ${Reason||
            "Reason not given!"}`
        );
      message.channel.send(embed);
      console.log(
        `User: ${Member.tag} (${Member.id}) He was banned from ${
          message.guild.name
        } For ${Reason || "Reason not given!"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `No, you can't ban this player!`
        )
        .then(() => console.log(error));
    }

    //End
  }
};
