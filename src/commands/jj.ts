import Discord from 'discord.js';
import { ICommand } from '../types/wokcommandstypes';
import axios from 'axios';
import superagent from 'superagent';

const Command: ICommand = {
	aliases: ['j'],
	category: 'General',
	description: 'Returns info from the code.org documents.',
	cooldown: '3s',
	hidden: false,
	ownerOnly: false,
	guildOnly: true,
	testOnly: false,
	//slash: true,
	//globalCooldown: '10m', min of 1m!
	// minArgs: 1,
	// maxArgs: 1,
	// expectedArgs: '<url>',
	//permissions: ['SEND_MESSAGES'],


	callback: async ({ message, client, args }) => {
		var lo = new Discord.MessageEmbed()
			.setDescription(`Please wait...`)
			.setTimestamp()

		axios
			.get<string[]>('https://simplescraper.io/api/GcQKHOzbFUB2yieyUPD7?apikey=VaEHAkC1RXtXT1owR7AY4YHBpZRcxEJt&run_now=true&limit=100')
			.then((response) => {
				console.log(response);
				var embed_nsfw = new Discord.MessageEmbed()
					.setDescription(response.data[0])
					.setTimestamp()
					.setImage(response.body.message) //???
					.setFooter(client.user!.tag) //???

				message.edit(embed_nsfw); ///???
			})
			.catch((error) => {
				console.error(error)
			});

		message.channel.send(lo).then(m => {

			superagent.get('https://simplescraper.io/api/GcQKHOzbFUB2yieyUPD7?apikey=VaEHAkC1RXtXT1owR7AY4YHBpZRcxEJt&run_now=true&limit=100').query({ type: 'ass' }).end((err, response) => {

				var embed_nsfw = new Discord.MessageEmbed()
					.setDescription(`:underage:\n**[L'image ne se charge pas ? cliquez ici](${response.body.message})**`)
					.setTimestamp()
					.setImage(response.body.message)
					.setFooter(client.user!.tag) //???

				m.edit(embed_nsfw);
			});
		});
	}
}
export default Command;