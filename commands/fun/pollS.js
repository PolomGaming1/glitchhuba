const Discord = require('discord.js')

module.exports = {
  name: "poll",
  aliases: ["mkpoll"],
  description: "Create a simple yes or no poll",
  category: "fun",
  run:  async(bot, message, args) => {
      //Start
    message.delete();
  if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send("No, bro!")
  let poll = args.join(" ");
  if(!poll) {
    return message.reply('Please, write a text!')
  }
  const pollembed = new Discord.MessageEmbed()
  .setTitle('POLL')
  .setDescription(poll)
  .setColor('YELLOW')
  .setFooter(` ${message.author.username}`)
  .setTimestamp();
  const r = await message.channel.send(pollembed)
    r.react("👍")
    .then(() => r.react("👎"))
  },
};
