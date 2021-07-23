const economy = require('../features/economy');

module.exports = {
  aliases: ['bal', 'wallet', 'wal', 'funds'],
  category: 'General',
  description: 'Sends your current balance!',
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
		const target = message.mentions.users.first() || message.author;
    const targetId = target.id;

    const guildId = message.guild.id;

    const coins = await economy.getCoins(guildId, targetId);

    message.reply(`That user has ${coins} coins!`);
	}
}