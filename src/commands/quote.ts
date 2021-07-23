import Discord from 'discord.js';
import quotes from 'quote-lib';
import { ICommand } from '../types/wokcommandstypes';

const Command: ICommand = {
  aliases: ['quotes'],
  category: 'Fun',
  description: 'Returns motivational, entrepreneur, education, or programming quotes.',
  cooldown: '2s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '10m', min of 1m!
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<type-of-quote(do ++quote help for categories)>',
  //permissions: ['SEND_MESSAGES'],


  callback: ({ message, client, args }) => {
    const quote = quotes.getByCategory(args[0]);

    const emb = new Discord.MessageEmbed()
      .setColor('#FFB6C1')
      .setTitle(`${quote.category} Quote`)
      .setDescription(quote.quote)
      .setAuthor(quote.author)
      .setTimestamp();

    message.channel.send(emb);
  }
}
export default Command;