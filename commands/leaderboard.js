const Discord = require('discord.js');
const Levels = require('discord.js-leveling');

module.exports = {
  aliases: ['leadeb', 'levels'],
  category: 'General',
  description: 'Sends the level leaderboard for the current server.',
  cooldown: '2s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '10m', min of 1m!
  //minArgs: 0,
  //maxArgs: 0,
  //expectedArgs: '',
  //permissions: ['SEND_MESSAGES'],

  callback: async ({ message, client, args }) => {
		const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 8);

		if(rawLeaderboard.length < 1) return message.reply("Your leaderboard is not yet setup.");

		const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard);
		const lb = (await leaderboard).map(e => `**${e.position}**. ${e.username}#${e.discriminator} ~ **Level ${e.level}** ~ **XP**: *${e.xp.toLocaleString()}*`);

		const newEmbed = new Discord.MessageEmbed()
		.setColor('#FFB6C1')
		.setTitle(`${message.guild.name}'s Level Leaderboard`)
		.setDescription(`${lb.join("\n\n")}`);

		message.channel.send(newEmbed);
  }
}