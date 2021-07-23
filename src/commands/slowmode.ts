import { ICommand } from "../types/wokcommandstypes";

const Command: ICommand = {
  aliases: ['slowm', 'smode', 'slow'],
  category: 'Moderation',
  description: 'Set the slowmode of the current channel.',
  cooldown: '5s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: '<time-in-seconds> <optional:reason>',
  permissions: ['ADMINISTRATOR'],


  callback: async ({ message, client, args }) => {
    args[1] ? message.channel.setRateLimitPerUser(parseInt(args[0]), args.slice(1).join(' ')) : message.channel.setRateLimitPerUser(parseInt(args[0]));
  }
}
export default Command;