module.exports = {
  aliases: ['cemoji', 'newemoji'],
  category: 'Moderation',
  description: 'Create a new emoji!',
  cooldown: '30s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '10m', min of 1m!
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: '<image-url> <emoji-name>',
  permissions: ['MANAGE_EMOJIS'],


  callback: ({ message, client, args }) => {
  message.guild.emojis.create(args[0], args[1])
  .then(emoji => message.reply(`Create the ${emoji} called ${emoji.name}`))
  .catch(message.reply('Emoji file too large, Emoji name too long, or unexpected error.'));
  }
}