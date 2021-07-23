import { ICommand } from "../types/wokcommandstypes";

const Command: ICommand = {
  aliases: ['urgay'],
  category: 'Fun',
  description: 'Turn another users pfp rainbow',
  cooldown: '2s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '10m', min of 1m!
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<@user>',
  //permissions: ['SEND_MESSAGES'],


  callback: ({ message, client, args }) => {
    const { MessageEmbed, MessageAttachment } = require('discord.js')

    let user = message.mentions.users.first()!;

    if (!user.avatarURL())
      return message.reply(`:x: ${user.tag} profile photo not found.`).then(msg => { msg.delete({ timeout: 3000 }) }).catch(console.error);

    const embed = new MessageEmbed()
      .setColor('#FFB6C1')
      .setTitle(`${user.tag} get rainbowified!`)
      .setImage(`https://some-random-api.ml/canvas/gay/?avatar=${user.avatarURL({ format: 'png' })}`);

    message.channel.send(embed);
  }
}

export default Command;