module.exports = (client, instance) => {
	const path = require('path')
	const { getChannelId } = require('../commands/setgoodbye')
	const Discord = require('discord.js')
	const Canvas = require("discord-canvas")
	
	client.on('guildMemberRemove', async (member) => {
		const { guild } = member

    const channelId = getChannelId(guild.id)
    if (!channelId) {
      return
    }

    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      return
    }

		const goodbyeSchema = require('../models/goodbye-schema');

		goodbyeSchema.findOne({guildId: guild.id}).then(async document => {
			const bckImg = document.backgroundImage;
			const color = document.color;

			if(!bckImg && !color) {
				let image = await new Canvas.Goodbye()
				.setUsername(member.user.username)
				.setDiscriminator(member.user.discriminator)
				.setMemberCount(member.guild.memberCount)
				.setGuildName(member.guild.name)
				.setAvatar(member.user.displayAvatarURL({format: 'png'}))
				.setColor("border", "#6B6B6B")
				.setColor("username-box", "#6B6B6B")
				.setColor("discriminator-box", "#6B6B6B")
				.setColor("message-box", "#6B6B6B")
				.setColor("title", "#6B6B6B")
				.setColor("avatar", "#6B6B6B")
				.setBackground("https://i2.wp.com/css-tricks.com/wp-content/uploads/2018/12/gradient-border.png")
				.toAttachment();

				let atta = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");

				channel.send('', atta);
			} else if(bckImg && !color) {
				let image = await new Canvas.Goodbye()
				.setUsername(member.user.username)
				.setDiscriminator(member.user.discriminator)
				.setMemberCount(member.guild.memberCount)
				.setGuildName(member.guild.name)
				.setAvatar(member.user.displayAvatarURL({format: 'png'}))
				.setColor("border", "#6B6B6B")
				.setColor("username-box", "#6B6B6B")
				.setColor("discriminator-box", "#6B6B6B")
				.setColor("message-box", "#6B6B6B")
				.setColor("title", "#6B6B6B")
				.setColor("avatar", "#6B6B6B")
				.setBackground(bckImg)
				.toAttachment();

				let atta = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");

				channel.send('', atta);
			} else if(color && !bckImg){
				let image = await new Canvas.Goodbye()
				.setUsername(member.user.username)
				.setDiscriminator(member.user.discriminator)
				.setMemberCount(member.guild.memberCount)
				.setGuildName(member.guild.name)
				.setAvatar(member.user.displayAvatarURL({format: 'png'}))
				.setColor("border", color)
				.setColor("username-box", color)
				.setColor("discriminator-box", color)
				.setColor("message-box", color)
				.setColor("title", color)
				.setColor("avatar", color)
				.setBackground("https://i2.wp.com/css-tricks.com/wp-content/uploads/2018/12/gradient-border.png")
				.toAttachment();

				let atta = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");

				channel.send('', atta);
			} else if(color && bckImg){
				let image = await new Canvas.Goodbye()
				.setUsername(member.user.username)
				.setDiscriminator(member.user.discriminator)
				.setMemberCount(member.guild.memberCount)
				.setGuildName(member.guild.name)
				.setAvatar(member.user.displayAvatarURL({format: 'png'}))
				.setColor("border", color)
				.setColor("username-box", color)
				.setColor("discriminator-box", color)
				.setColor("message-box", color)
				.setColor("title", color)
				.setColor("avatar", color)
				.setBackground(bckImg)
				.toAttachment();

				let atta = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");

				channel.send('', atta);
			}
		}); 
	})
}

module.exports.config = {
  displayName: 'Goodbye System',
  dbName: 'GOODBYE MESSAGE',
  loadDBFirst: false
}