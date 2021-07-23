import Discord from 'discord.js';
import { ICommand } from '../types/wokcommandstypes';

const Command: ICommand = {
  aliases: ['p'],
  category: 'Fun',
  description: 'Returns bot and api speeds',
  cooldown: '2s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '10m', min of 1m!
  //minArgs: 0,
  //maxArgs: 0,
  //expectedArgs: '',
  //permissions: ['SEND_MESSAGES'],


  callback: ({ message, client, args }) => {
    const loadEm = new Discord.MessageEmbed()
      .setColor('#FFB6C1')
      .setDescription('Loading data...')

    message.channel.send(loadEm).then(async (msg) => {
      msg.delete()

      const newEmbed = new Discord.MessageEmbed()
        .setColor('#FFB6C1')
        .setTitle('Ping Results~')
        .addFields(
          { name: 'Latency:', value: `${msg.createdTimestamp - message.createdTimestamp}ms`, inline: true },
          { name: 'API Latency:', value: `${Math.round(client.ws.ping)}ms`, inline: true }
        )
        .setTimestamp()
        .setThumbnail('https://images-ext-1.discordapp.net/external/pnkyYI3Sqp9vmGdhsWP7XmnPwyvmHC65bx1Wdhheh_M/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/841777441117831189/f6378c40a7aac70efe0d2c8ea1a82942.webp');

      message.channel.send(newEmbed);
    });
  }
}

export default Command;