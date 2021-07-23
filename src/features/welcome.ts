// const Canvas = require('canvas')
// const { MessageAttachment } = require('discord.js')
import path from 'path'
import { getChannelId } from '../commands/setwelcome'
// //require('../fonts/sans-serif.ttf')
// //Canvas.registerFont('../fonts/sans-serif.ttf', {family: 'sans-serif'})
import Discord, { TextChannel } from 'discord.js'
import Canvas from "discord-canvas"

export default (client: Discord.Client) => {
  client.on('guildMemberAdd', async (member) => {
    // const { guild } = member

    // const channelId = getChannelId(guild.id)
    // if (!channelId) {
    //   return
    // }

    // const channel = guild.channels.cache.get(channelId)
    // if (!channel) {
    //   return
    // }

    // const canvas = Canvas.createCanvas(700, 250)
    // const ctx = canvas.getContext('2d')

    // const background = await Canvas.loadImage(
    //   path.join(__dirname, '../background.png')
    // )
    // let x = 0
    // let y = 0
    // ctx.drawImage(background, x, y)

    // const pfp = await Canvas.loadImage(
    //   member.user.displayAvatarURL({
    //     format: 'png',
    //   })
    // )
    // x = canvas.width / 2 - pfp.width / 2
    // y = 25
    // ctx.drawImage(pfp, x, y)

    // ctx.fillStyle = '#ffffff'
    // ctx.font = '35px sans-serif'
    // let text = `Welcome ${member.user.tag}`
    // x = canvas.width / 2 - ctx.measureText(text).width / 2
    // ctx.fillText(text, x, 60 + pfp.height)

    // ctx.font = '30px sans-serif'
    // text = `Member #${guild.memberCount}`
    // x = canvas.width / 2 - ctx.measureText(text).width / 2
    // ctx.fillText(text, x, 100 + pfp.height)

    // const attachment = new MessageAttachment(canvas.toBuffer())
    // channel.send('', attachment)

    const image = await new Canvas.Welcome()
      .setUsername(member.user.username)
      .setDiscriminator(member.user.discriminator)
      .setMemberCount(member.guild.memberCount)
      .setGuildName(member.guild.name)
      .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
      .setColor("border", "#8015EA")
      .setColor("username-box", "#8015EA")
      .setColor("discriminator-box", "#8015EA")
      .setColor("message-box", "#8015EA")
      .setColor("title", "#8015EA")
      .setColor("avatar", "#8015EA")
      .setBackground("https://image.freepik.com/free-vector/simple-pink-blurred-background_1035-3331.jpg")
      .toAttachment();

    const attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye-image.png");

    const channelId = getChannelId(member.guild.id);
    if (!channelId) {
      return
    }

    const channel = member.guild.channels.cache.get(channelId) as TextChannel;
    if (!channel) {
      return
    }

    channel.send('', attachment);
  })
}