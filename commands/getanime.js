const Discord = require('discord.js');

module.exports = {
  aliases: ['ganime', 'anime', 'ani'],
  category: 'Anime',
  description: 'Returns information on animes(streaming links, desc, episodes, etc.)',
  cooldown: '3s',
  hidden: false,
  ownerOnly: false,
  guildOnly: true,
  testOnly: false,
  //slash: true,
  //globalCooldown: '5m',
  //minArgs: -1,
  //maxArgs: -1,
  expectedArgs: '<optional-episode-number> <name-of-anime(REQUIRED TO BE IN QUOTES, "naruto shippuden)>"',
  permissions: ['SEND_MESSAGES'],


  callback: async ({ message, client, args }) => {
		if(!message.content.includes('"')) return message.reply('Please put your anime name in quotes, for more help try ++help getanime');

		try{ 
			const animeapi = require('ctk-anime-scraper');
			const { MessageEmbed, MessageAttachment, MessageCollector } = require('discord.js');

			const name = message.content
			.match(/(?:"[^"]*"|^[^"]*$)/)[0]
			.replace(/"/g, "")

			

			if(isNaN(args[0])){
				await animeapi.search(name).then((data) => {
					if(!data.length) return message.reply("No Anime with this name found")
					let ani = new MessageEmbed()
					.addField('Link:', `[Click to watch](${data[0].link})`)
					animeapi.fetchAnime(data[0].link, {
						disableEpisodeFetch: true
						}).then(data => {
							ani
							.setTitle(data.name)
							.setThumbnail(data.image)
							.addFields(
								{name: 'Episodes:', value: data.episodeCount, inline: true},
								{name: 'Status:', value: data.status, inline: true},
								{name: 'Type:', value: data.type, inline: true},
								{name: 'Genre:', value: data.genre, inline: true},
								{name: 'Released:', value: data.released, inline: true},
							)
							message.channel.send(ani)
						})
				});
			} else {
				console.log('dis do be workin');
				await animeapi.search(name).then((data) => {
				if(!data.length) return message.reply("No Anime with this name found");
					let ani = new MessageEmbed()
					.addField('Link:', `[Click to watch](${data[0].link})`)
					animeapi.fetchAnime(data[0].link, {episode: args[0]}).then(data => {
							ani
							.setTitle(data.name)
							.setThumbnail(data.image)
							.addFields(
								{name: 'Episodes:', value: data.episodeCount, inline: true},
								{name: 'Status:', value: data.status, inline: true},
								{name: 'Type:', value: data.type, inline: true},
								{name: 'Genre:', value: data.genre, inline: true},
								{name: 'Released:', value: data.released, inline: true},
							)
							message.channel.send(ani)
						}).catch(e => console.log(e));
				});
			}
	} catch (err){
		return message.reply("An unexpected error occured, make sure you are using the correct syntax.");
	}
	}
}