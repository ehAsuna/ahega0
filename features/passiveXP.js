module.exports = (client, instance) => {
	client.on("message", async (message) => {
		if (!message.guild) return;
		if (message.author.bot) return; 
		const Discord = require('discord.js');
		const Levels = require('discord.js-leveling');
		const user = await Levels.fetch(message.author.id, message.guild.id);

		const requiredXp = Levels.xpFor(parseInt(user.level) + 1)

		const randomAmountOfXp = Math.floor(Math.random() * 39) + 1; // Min 1, Max 40
		const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);

		if(hasLeveledUp) {		
			const levelEmbed = new Discord.MessageEmbed()
			.setDescription(`**GG** ${message.author}, you just leveled up to level **${user.level + 1}**!\n🥳`)

			const sendEmbed = await message.channel.send(levelEmbed)
			sendEmbed.react('🥳')
		}
	});
}

module.exports.config = {
  displayName: 'Passive XP System',
  dbName: 'PASSIVE XP',
  loadDBFirst: false
}