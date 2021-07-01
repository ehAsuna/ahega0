module.exports = {
  permissions: ['ADMINISTRATOR'],
  callback: ({ message, client, args }) => {
    client.emit('guildMemberAdd', message.member)
  },
}