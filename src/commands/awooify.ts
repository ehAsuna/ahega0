import Discord from 'discord.js';
import { NekoBot } from "nekobot-api";
import { ICommand } from '../types/wokcommandstypes';
const api = new NekoBot();

const Command: ICommand = {
	aliases: ['awoo'],
	category: 'Fun',
	description: 'Distort an image!',
	cooldown: '3s',
	hidden: false,
	ownerOnly: false,
	guildOnly: true,
	testOnly: false,
	//slash: true,
	//globalCooldown: '5m',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: '<image-url-OR-user@>',
	permissions: ['SEND_MESSAGES'],


	callback: async ({ message, client, args }) => {
		try {
			if (message.mentions.members!.first()) {
				let user: Discord.User;

				if (args[0] && isNaN(args[0])) user = message.mentions.users.first()!;

				if (args[0] && !isNaN(args[0])) {
					user = client.users.cache.get(args[0])!;

					if (!message.guild!.members.cache.has(args[0]))
						return message.reply(':x: User not found.').then(msg => { msg.delete({ timeout: 3000 }) }).catch(console.error);
				}

				const image = await api.generate("awooify", { url: user!.avatarURL()! });
				const embed = new Discord.MessageEmbed()
					.setColor('#FFB6C1')
					.setTitle(`Awooified`)
					.setImage(image);
				message.channel.send(embed)
			}
		} catch (e) {
			console.log(e)
			return message.reply('An error may have occured in the api, or your command usage was wrong.')
		}
	}
}