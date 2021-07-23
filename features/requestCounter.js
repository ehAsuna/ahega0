module.exports = (client, instance) => {
	client.on('messageReactionAdd', (reaction) => {
		if(reaction.message.channel.id == '842870928000942100'){
			if(reaction.message.embeds[0].title.includes('Feature:')){
				let yC = reaction.message.reactions.cache.get('👍').count;
				let nC = reaction.message.reactions.cache.get('👎').count;

				if(yC >=5){
					const oldEmbed = reaction.message.embeds[0];
					const verifiedEmbed = new Discord.MessageEmbed(oldEmbed)
					.addFields(
						{ name: 'Total 👍:', value: yC, inline: true },
						{ name: 'Total 👎:', value: nC, inline: true}
					).setFooter('**Request Possibly Coming Soon**');

						reaction.message.delete();
						reaction.message.channel.send(verifiedEmbed);
				} else if(nC >=5){
						const oldEmbed = reaction.message.embeds[0];
						const deniedEmbed = new Discord.MessageEmbed(oldEmbed)
						.addFields(
						{ name: 'Total 👍:', value: yC, inline: true },
						{ name: 'Total 👎:', value: nC, inline: true}
						).setFooter('**Request Denied**');

						reaction.message.delete();
						reaction.message.channel.send(deniedEmbed);
				}
			}
		}
	});

	const fs = require('fs');
	let hh = [];

	// fs.open('h.html', 'w', function (err, file) {
	// 	if (err) throw err;
	// 	console.log('Saved!');
	// });

	// instance.commandHandler.commands.forEach(c => {
	// 	hh = hh + `<button type="button" class="collapsible">${c.names[0]}<span> - ${c.description}</span></button>\n<div class="content">\n<h4 style="color: rgb(169, 247, 247);">Category:</h4>\n<p style="color: aqua;">${c.category}</p>\n<h4 style="color: #cccccc;">Usage:</h4>\n<p>${'++' + c.names[0]}</p>\n<h4 style="color: #cccccc;">Examples:</h4>\n<p>${'++' + c.names[0] + c.syntax}</p>\n</div>\n<br>\n<br>\n`

	// 	fs.writeFile('h.html', hh, function(err){
	// 		if (err) throw err;
	// 		console.log('Saved!');
	// 	});
	// });	
}

module.exports.config = {
  displayName: 'Request Counter',
  dbName: 'REQUEST COUNTER',
  loadDBFirst: false,
}