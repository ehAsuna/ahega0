import Discord from 'discord.js';
import Guild from '../models/muted-schema';
import muteSchema from '../models/muted-schema';
import { ICommand } from '../types/wokcommandstypes';

const Command: ICommand = {
  aliases: ['unshush'],
  category: 'Moderation',
  description: 'Un-mutes a user.',
  cooldown: '10s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '10m', min of 1m!
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<user@-or-id>',
  permissions: ['ADMINISTRATOR'],


  callback: async ({ message, client, args }) => {
    //!unmute @
    //!unmute ID

    const guild = message.guild!;

    /* unreachable code
    if (args.length !== 1) {
      message.reply(
        `Please use the correct syntax: ${guild.commandPrefix} mute <Target user\'s @ OR their ID>`
      )
      return
    }
    */

    let id = ''

    const target = message.mentions.users.first()
    if (target) {
      id = target.id
    } else {
      id = args[0]
    }

    const result = await muteSchema.updateOne(
      {
        guildId: guild.id,
        userId: id,
        current: true,
      },
      {
        current: false,
      }
    )

    if (result.nModified === 1) {
      const mutedRole = guild.roles.cache.find((role) => {
        return role.name === 'Muted'
      })

      if (mutedRole) {
        const guildMember = guild.members.cache.get(id)!
        guildMember.roles.remove(mutedRole)
      }

      message.reply(`You unmuted <@${id}>`)
    } else {
      message.reply('That user is not muted')
    }
  }
}
export default Command;