import { NekoBot } from "nekobot-api";
import { ICommand } from "../types/wokcommandstypes";
import { MessageEmbed, MessageAttachment } from 'discord.js';

const api = new NekoBot();

const Command: ICommand = {
  aliases: ['shoot', 'murder'],
  category: 'Fun',
  description: 'Murder another user!',
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


  callback: async ({ message, client, args }) => {
    let user = message.mentions.users.first()!;
    const image = await api.generate("threats", { url: user!.avatarURL()! }); //changed from image to url to avoid bug, dont know what this is about

    if (!user.avatarURL())
      return message.reply(`:x: ${user.tag} profile photo not found.`).then(msg => { msg.delete({ timeout: 3000 }) }).catch(console.error);

    if (user.id == message.author.id) return message.reply('You cannot murder yourself :(').then(msg => { msg.delete({ timeout: 3000 }) }).catch(console.error);

    const embed = new MessageEmbed()
      .setColor('#FFB6C1')
      .setTitle(`${message.author.tag} killed ${user.tag}!`)
      .setThumbnail(image)
      .setImage(`https://some-random-api.ml/canvas/wasted/?avatar=${user.avatarURL({ format: 'png' })}`);

    message.channel.send(embed);
  }
}
export default Command;