import { MessageEmbed } from 'discord.js';
import { NekoBot } from "nekobot-api";
import { ICommand } from '../types/wokcommandstypes';
const api = new NekoBot();

const Command: ICommand = {
  aliases: ['clyde'],
  category: 'Fun',
  description: 'Clydify some text!',
  cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  //minArgs: 1,
  //maxArgs: 1,
  //expectedArgs: '',
  permissions: ['SEND_MESSAGES'],


  callback: async ({ message, client, args }) => {
    try {
      if (message.content.toLowerCase().includes("@everyone")) {
        return message.reply(", seriously someone get a mod he just tried to ping everyone. :rollingeyes:")
      }
      const content = args.slice(0).join(' ')
      const image = await api.generate("clyde", { text: content });
      const embed = new MessageEmbed()
        .setColor('#FFB6C1')
        .setTitle(`Your Clydified Text!`)
        .setImage(image);
      message.channel.send(embed)
    } catch (e) {
      console.log(e)
      return message.reply('An error may have occured in the api, or your command usage was wrong.')
    }
  }
}
export default Command;