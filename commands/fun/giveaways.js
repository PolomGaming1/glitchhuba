const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "gv",
  aliases:[],
  description: "Create a simple giveaway",
  usage: "<time> <channel> <prize>",
  category: "fun",
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`!gv <time> <channel> <price>`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `Špatně!`
      );
    if (isNaN(args[0][0])) return message.channel.send(`This is not number!`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `Nemůžu najít tento channel na serveru!`
      );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send('The main prize was not entered!');
    message.channel.send(`*Giveaway created in ${channel}*`);
    let Embed = new MessageEmbed()
      .setTitle(`New giveaway!`)
      .setDescription(
        `**${prize}**`
      )
      .setTimestamp (Date.now() + ms(args[0]))
      .setColor(`YELLOW`)
    
    let m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reakce: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(
          `Not enough people reacted to choose the winner!`
        );
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(
        `Winner giveaway **${prize}** is ${winner}`
      );
    }, ms(args[0]));
  },
};