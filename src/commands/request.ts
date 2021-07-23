import { TextChannel } from "discord.js";
import { ICommand } from "../types/wokcommandstypes";

const Command: ICommand = {
	aliases: ['addfeature', 'idea'],
	category: 'Development',
	description: 'Request a new feature for my developer to add!',
	cooldown: '5s',
	hidden: false,
	ownerOnly: false,
	guildOnly: true,
	testOnly: false,
	//slash: true,
	//globalCooldown: '10m', min of 1m!
	minArgs: 5,
	maxArgs: -1,
	expectedArgs: '<Feature-you-want-added(Minimum of 5 words)>',
	//permissions: ['SEND_MESSAGES'],


	callback: ({ message, client, args }) => {
		const { MessageEmbed, MessageAttachment } = require('discord.js');
		const channelToSend = client.channels.cache.find(channel => (channel as TextChannel).name === '╙┈🤖-suggest-ideas')! as TextChannel; //???
		const Author = message.author;

		const errorEmbed = new MessageEmbed()
			.setColor('#FFB6C1')
			.setDescription('You need to request something.');

		const sentEmbed = new MessageEmbed()
			.setColor('RANDOM')
			.setDescription('Request sent! Thank you.');

		if (message.content.toLowerCase().includes("@everyone")) {
			return message.reply("Nice try boyo.")
		}
		const content = args.slice(0).join(' ')

		const embed = new MessageEmbed()
			.setColor('#FFB6C1')
			.setAuthor(message.author.tag, message.author.avatarURL())
			.setTitle('New Requested Feature:')
			.setDescription(content)
			.setTimestamp();

		try {
			gogo();
		} catch (e) {
			return;
		}
		async function gogo() {

			if (message.content.length <= 0 || message.content == null || message.content == undefined) {
				message.channel.send(errorEmbed).then(msg => { msg.delete({ timeout: 3000 }) }).catch(console.error);
			} else {
				message.channel.send(sentEmbed);
				const question = await channelToSend.send(embed);

				let ryC = 0;

				let rnC = 0;


				['👍', '👎'].forEach(async el => await question.react(el));
			}
		}
	}
}
export default Command;