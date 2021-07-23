import welcomeSchema from '../models/welcome-schema'
import { ICommand } from '../types/wokcommandstypes'

const cache = new Map<string, string>()

const loadData = async () => {
  const results = await welcomeSchema.find()

  for (const result of results) {
    cache.set(result.guildId, result.channelId)
  }
}
loadData()

function getChannelId(guildId: string) {
  return cache.get(guildId)
}

const Command: ICommand = {
  permissions: ['ADMINISTRATOR'],
  callback: async ({ message, args }) => {

    await welcomeSchema.findOneAndUpdate(
      {
        _id: message.guild!.id,
      },
      {
        _id: message.guild!.id,
        channelId: args[0],
      },
      {
        upsert: true,
      }
    )

    cache.set(message.guild!.id, message.channel.id)

    message.reply('Welcome channel set!')
  },
}

export default Command;

export { getChannelId }