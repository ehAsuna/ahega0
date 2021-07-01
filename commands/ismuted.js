const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const muteSchema = require('../models/muted-schema')

module.exports = {
  aliases: ['ism', 'muted'],
  category: 'Moderation',
  description: 'Check if a user is muted.',
  cooldown: '5s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<user-id>',
  permissions: ['ADMINISTRATOR'],


  callback: async ({ message, client, args }) => {
  	const { guild } = message

    let id = args[0]
		if(isNaN(id)){
			id = message.mentions.users.first().id;
		}

    const members = await guild.members.fetch()
    const target = members.get(id)
    const isInDiscord = !!target

    const currentMute = await muteSchema.findOne({
      userId: id,
      guildId: guild.id,
      current: true,
    })

    const embed = new MessageEmbed()
      .setAuthor(
        `Mute info for ${target ? target.user.tag : id}`,
        target ? target.user.displayAvatarURL() : ''
      )
      .addField('Currently muted', currentMute ? 'Yes' : 'No')
      .addField('Is in Discord', isInDiscord ? 'Yes' : 'No')

    if (currentMute) {
      const date = new Date(currentMute.expires)

      embed
        .addField('Muted by', `<@${currentMute.staffId}>`)
        .addField('Muted for', currentMute.reason.toLowerCase())
        .addField('Mute expires', `${date.toLocaleString()} EST`)
    }

    message.reply(embed)
  }
}