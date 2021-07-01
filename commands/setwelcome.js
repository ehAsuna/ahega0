const welcomeSchema = require('../models/welcome-schema')

const cache = new Map()

const loadData = async () => {
  const results = await welcomeSchema.find()

  for (const result of results) {
    cache.set(result._id, result.channelId)
  }
}
loadData()

module.exports = {
  permissions: ['ADMINISTRATOR'],
  callback: async ({ message, args }) => {

    await welcomeSchema.findOneAndUpdate(
      {
        _id: message.guild.id,
      },
      {
        _id: message.guild.id,
        channelId: args[0],
      },
      {
        upsert: true,
      }
    )

    cache.set(message.guild.id, message.channel.id)

    message.reply('Welcome channel set!')
  },
}

module.exports.getChannelId = (guildId) => {
  return cache.get(guildId)
}