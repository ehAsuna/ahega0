import Discord from 'discord.js';
import { ICommand } from '../types/wokcommandstypes';
import tinyurl from "tinyurl-api";

const Command: ICommand = {
  aliases: ['tinyurl', 'littlelink', 'shortenurl', 'surl'],
  category: 'General',
  description: 'Shortens a sent url using the tinyurl api.',
  cooldown: '10s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '10m', min of 1m!
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<url>',
  //permissions: ['SEND_MESSAGES'],


  callback: async ({ message, client, args }) => {
    const reg = new RegExp(/^((?:https?:)?\/\/)?((?:www|m)\.)?/g)
    if (reg.test(args[0]) == false) return message.reply('Please send a valid URL to shorten.')

    const url = await tinyurl(args[0]);
    message.channel.send('Here is your tiny URL: ' + url)

  }
}

export default Command;