import Discord, { MessageEmbed, MessageAttachment, MessageCollector } from 'discord.js';
import superagent from 'superagent';
import { ICommand } from '../types/wokcommandstypes';

const Command: ICommand = {
  aliases: ['grab'],
  category: 'NSFW',
  description: 'returns args only in quotes',
  cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  //minArgs: -1,
  //maxArgs: -1,
  //expectedArgs: '<file-language(no abreviations!)> <text to srcbin>',
  permissions: ['SEND_MESSAGES'],


  callback: ({ message, client, args }) => {

    const quote = message.content
      .match(/(?:"[^"]*"|^[^"]*$)/)![0]
      .replace(/"/g, "")
    console.log(quote);
    console.log(message.content);
  }
}

export default Command;