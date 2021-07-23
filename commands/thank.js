const thankSchema = require('../models/thank-schema')

module.exports = {
	name: 'thank',
  aliases: ['thankyou'],
  category: 'General',
  description: 'Thank a user for their good-doings.',
  cooldown: '1s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  //minArgs: 1,
  //maxArgs: 1,
  expectedArgs: '<user@-or-userId>',
  //permissions: ['ADMINISTRATOR'],
  callback: async ({ message, args }) => {
		let user;
		if (args[0] && isNaN(args[0])) user = message.mentions.users.first();
		if (args[0] && !isNaN(args[0])) {
			user = client.users.cache.get(args[0]);

			if (!message.guild.members.cache.has(args[0]))
				return message.reply(':x: User not found.').then(msg => { msg.delete({ timeout: 3000 })}).catch(console.error);
		}

		if (user.id == message.author.id) return message.reply("You cannot thank yourself.");

		user = user.id;
		
    thankSchema.findOneAndUpdate({
      userId: user
    }, {
			userId: user,
      $inc: {total: 1}
    }, {
      upsert: true
    });
	},
}