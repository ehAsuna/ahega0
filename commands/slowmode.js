const Discord = require('discord.js');
const muteSchema = require('../models/muted-schema')

module.exports = {
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
  	args[1] ? message.channel.setRateLimitPerUser(args[0], args.slice(1).join(' ')): message.channel.setRateLimitPerUser(args[0]);
  }
}