module.exports = {
	name: 'simjoin',
  aliases: ['simwelc'],
  category: 'Moderation',
  description: 'Simulates a join to test welcome message on your server.',
  //cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  //minArgs: 1,
  //maxArgs: 1,
  //expectedArgs: '<user@>',
  permissions: ['ADMINISTRATOR'],
  callback: ({ message, client, args }) => {
    client.emit('guildMemberAdd', message.member)
  },
}