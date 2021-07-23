const economy = require('../features/economy');

module.exports = {
  aliases: ['addbal', 'addbalance'],
  category: 'General',
  description: 'Add balance to user.',
  cooldown: '2s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '10m', min of 1m!
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: '<@user> <#-of-coins>',
  permissions: ['ADMINISTRATOR'],
  callback: async ({ message, client, args }) => {
    const target = message.mentions.users.first();
		
    if (!target) {
      message.reply('Please tag a user to add coins to.');
      return;
    }

    const coins = args[1]
    if (isNaN(coins)) {
      message.reply('Please provide a valid numnber of coins.');
      return;
    }

    const newCoins = await economy.addCoins(message.guild.id, target.id, coins);

    message.reply(
      `You have given <@${target.id}> ${coins} coin(s). They now have ${newCoins} coin(s)!`
    );
  },
}