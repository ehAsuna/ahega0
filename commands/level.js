const Discord = require('discord.js');
const Levels = require('discord.js-leveling');
let yuricanvas = require("yuri-canvas");


module.exports = {
  aliases: ['rank', 'curlevel'],
  category: 'General',
  description: 'Sends your current level in the server.',
  cooldown: '2s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '10m', min of 1m!
  //minArgs: 0,
  maxArgs: 1,
  //expectedArgs: '',
  //permissions: ['SEND_MESSAGES'],

  callback: async ({ message, client, args }) => {
		const target = message.mentions.users.first();
		try{
			if(target){
				const user = await Levels.fetch(target.id, message.guild.id);
				const curXP = Levels.xpFor(parseInt(user.level))
				const toNLev = Levels.xpFor(parseInt(user.level) + 1);
				const presenc = target.presence.status;

				const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 8);

				if(rawLeaderboard.length < 1) return message.reply("Leaderboard error.");

				const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard);
				const lb = (await leaderboard).map(async e => {
					if(e.username == target.username){
						let image = await yuricanvas.rank({ 
							username: target.username, 
							discrim: target.discriminator, 
							level: user.level, 
							rank: e.rank, 
							neededXP: toNLev, 
							currentXP: curXP, 
							avatarURL: target.displayAvatarURL({ format: "png" }), 
							color: "pink", 
							background: "https://i2.wp.com/css-tricks.com/wp-content/uploads/2018/12/gradient-border.png",
							overlay: false, 
							status: presenc,
						});

						let attachment = new Discord.MessageAttachment(image, "rank.png");
						return message.channel.send(attachment);
					}
				});
			} else {
				const user = await Levels.fetch(message.author.id, message.guild.id);
				const curXP = Levels.xpFor(parseInt(user.level))
				const toNLev = Levels.xpFor(parseInt(user.level) + 1);

				const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 8);

				if(rawLeaderboard.length < 1) return message.reply("Leaderboard error.");

				const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard);
				const lb = (await leaderboard).map(async e => {
					if(e.username == message.author.username){
						let image = await yuricanvas.rank({ 
							username: message.author.username, 
							discrim: message.author.discriminator, 
							level: user.level, 
							rank: e.rank, 
							neededXP: toNLev, 
							currentXP: curXP, 
							avatarURL: message.author.displayAvatarURL({ format: "png" }), 
							color: "pink", 
							background: "https://i2.wp.com/css-tricks.com/wp-content/uploads/2018/12/gradient-border.png",
							overlay: false, 
							status: message.author.presence.status,
						});

						let attachment = new Discord.MessageAttachment(image, "rank.png");
						return message.channel.send(attachment);
					}
				});
			}
		} catch(e){
			return message.reply('You need to enough message to see your rank first!');
		}
	}
}