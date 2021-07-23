const goodbyeSchema = require('../models/goodbye-schema')

const cache = new Map()

const loadDataGB = async () => {
  const results = await goodbyeSchema.find()

  for (const result of results) {
    cache.set(result.guildId, result.channelId)
  }
}
loadDataGB();

module.exports = {
	name: 'setgoodbye',
  aliases: ['setgb'],
  category: 'Moderation',
  description: 'Sets the Goodbye Message channel in your server. Can customize the background image and color!',
  cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  //minArgs: 1,
  maxArgs: 2,
  expectedArgs: '<background-url(help: https://www.lifewire.com/copy-image-web-address-url-1174175 )> <color(has to be in hex ~ #FF0000, help: https://htmlcolorcodes.com )>',
  permissions: ['ADMINISTRATOR'],
  callback: async ({ message, args }) => {
		const { guild, channel } = message;

    await goodbyeSchema.findOneAndUpdate(
      {
        guildId: guild.id,
      },
      {
        guildId: guild.id,
        channelId: channel.id,
				backgroundImage: args[0],
				color: args[1],
      },
      {
        upsert: true,
      }
    )

    cache.set(guild.id, channel.id);

    message.reply('Goodbye message set! Try, ++help setgoodbye for more customization.');
  },
}

module.exports.getChannelId = (guildId) => {
  return cache.get(guildId)
}