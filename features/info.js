module.exports = (client, instance) => {
	client.on("debug", (info) => {
		const dbCh = client.channels.cache.find(channel => channel.name === '╙┈🤖-suggest-ideas').send(info);
	});

	client.on("warn", console.log);

	client.on("rateLimit", (rateLimitInfo) => {
		const Discord = require('discord.js');

		let rlEm = new Discord.MessageEmbed()
		.setTitle("New Rate limit")
		.addField(
			{name: 'My Limit:' , value: rateLimitInfo.limit, inline: true},
			{name: 'Timeout:' , value: rateLimitInfo.timeout, inline: true},
			{name: 'Method:' , value: rateLimitInfo.method, inline: true},
			{name: 'Path:' , value: rateLimitInfo.path, inline: true},
			{name: 'Route:' , value: rateLimitInfo.route, inline: true},
		);

		client.channels.cache.find(channel => channel.name === '╙┈🤖-rate-limits').send(rlEm);
	});

	client.on('guildCreate', (guild) => {
		const Discord = require('discord.js');

		const pfp = 'https://images-ext-1.discordapp.net/external/pnkyYI3Sqp9vmGdhsWP7XmnPwyvmHC65bx1Wdhheh_M/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/841777441117831189/f6378c40a7aac70efe0d2c8ea1a82942.webp';

		const awName = ["Honeybear", "Baby", "Bae", "Jellybean", "Babes", "Dumpling", "Wifey", "Love", "Beautiful", "Honey", "Boo", "Cutie", "Sugarplum", "Mi Amor", "Sweetie", "Perfect", "My Heart", "Sexy", "Doll", "Daisy", "Sweet Thing", "Treasure", "Pumpkin", "Angel", "Sweet Pea", "Adorable", "Sweetheart", "Pretty Lady", "Gorgeous", "Puddin’", "Lucky Charm", "My All", "Princess", "Queen", "My everything", "Dear", "Shortstuff", "Darling", "Cookie", "Other half", "Sunshine", "Better half", "Sugar Plum", "First Lady", "Buttercup", "Mamacita", "Babycakes", "Dream", "Bella", "Lovebug", "Fun size", "Sweet Potato", "My world", "Cupcake", "Hot stuff", "One and only", "Valentine", "Poohbear", "Teacup", "Hunnybunch", "Tulip", "Sweetface", "Crush", "Soulmate", "Girl of my dreams", "Lovely", "Jewel", "Good Looking", "Snookums", "Misses"]
		let channelID;
		let channels = guild.channels.cache;
		const newNick = (awName[Math.floor(Math.random() * awName.length)] + ' ahega0'); //randomly set name
		guild.me.setNickname(newNick);

		channelLoop:
		for (let key in channels) {
				let c = channels[key];
				if (c[1].type === "text") {
						channelID = c[0];
						break channelLoop;
				}
		}

		let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
		const servers = client.guilds.cache.size;
		const members = client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)

		const newGuildEmbed = new Discord.MessageEmbed()                              
    .setColor("#FFB6C1")                                                            
    .setAuthor('Click Here To Join The Support Server', '', 'https://discord.gg/kgGzbUtqMs')
    .setTitle(`Hey thanks for inviting me to ${guild.name}❤`)
		.setThumbnail(guild.iconURL({ dynamic: true}))
		.setDescription("To view my available commands run `++help`")
		.addFields(
			{ name: 'My Total Servers:', value: servers, inline: true }, 
			{ name: 'My Total Members:', value: members, inline: true}
			)
    .setTimestamp()
    .setFooter(`ID: ${guild.id}`);  

		channel.send(newGuildEmbed);

		const newServ = new Discord.MessageEmbed()
		.setColor("#FFB6C1")                                                            
    .setAuthor('Ahega0 Logger', guild.iconURL({ dynamic: true}))
		.setDescription(`Joined The Server ${guild.name}\nMembers: ${guild.memberCount} | Id: ${guild.id} |  `)
		.setTimestamp();

		client.channels.cache.get('844032081353113620').send(newServ);        
	});

	client.on('guildDelete', (guild) => {
		const Discord = require('discord.js');

		const leaveServ = new Discord.MessageEmbed()
		.setColor("#FFB6C1")                   
		.setAuthor('Ahega0 Logger', guild.iconURL({ dynamic: true}))                                         
		.setDescription(`**Left The Server** ${guild.name}`)
		.setTimestamp();

		client.channels.cache.get('844032081353113620').send(leaveServ)         
	});
}

module.exports.config = {
  displayName: 'Information Module',
	dbName: 'BOT INFO',
	loadDBFirst: false,
}