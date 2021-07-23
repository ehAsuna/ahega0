import Discord from 'discord.js';
import superagent from 'superagent';
import { ICommand } from '../types/wokcommandstypes';
const Command: ICommand = {
  aliases: ['tits', 'titties', 'boobies'],
  category: 'NSFW',
  description: 'Sends a random picture of BOOBS',
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
    if (!message.channel.nsfw && message.channel.id != '839214352053698600') return message.reply('You can only use this command in an NSFW channel.')

    let lo = new Discord.MessageEmbed()
      .setDescription(`Please Wait...`)
      .setTimestamp()

    message.channel.send(lo).then(m => {

      superagent.get('https://nekobot.xyz/api/image').query({ type: 'ass' }).end((err, response) => {

        var embed_nsfw = new Discord.MessageEmbed()
          .setDescription(`:underage:\n**[Image not loading? Click  here~>(${response.body.message})**`)
          .setImage(response.body.message)
          .setFooter(client.user!.tag)

        m.edit(embed_nsfw);
      });
    });
  }
}

export default Command;