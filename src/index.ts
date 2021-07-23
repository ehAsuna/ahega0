// https://discord.com/oauth2/authorize?client_id=841777441117831189&scope=bot&permissions=8589934583
import DiscordJS, { TextChannel } from 'discord.js';
import WOKCommands from 'wokcommands';
import express from 'express';
import dbots from 'dbots';
import dotenv from "dotenv";
dotenv.config();

let test: WOKCommands;

const client = new DiscordJS.Client({
	partials: ['MESSAGE', 'REACTION'],
});
require('discord-buttons')(client);


const app = express();
const port = 3000;

app.get('/', (req, res) => res.send(`Live on Port:${port}`));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

client.on('ready', () => {
	const wok = new WOKCommands(client, {
		commandDir: 'commands',
		featureDir: 'features',
		messagesPath: '',
		showWarns: false,
		testServers: ['790889521734352966', '842826911838765056'],
		del: 5,
	})
		.setMongoPath(process.env.uri!)
		.setCategorySettings([
			{
				name: 'General',
				emoji: '👌',
				hidden: false,
			},
			{
				name: 'Fun',
				emoji: '😂',
				hidden: false,
			},
			{
				name: 'Anime',
				emoji: '📺',
				hidden: false,
			},
			{
				name: 'NSFW',
				emoji: '🔞',
				hidden: false,
			},
			{
				name: 'Moderation',
				emoji: '📒',
				hidden: false,
			},
			{
				name: 'Configuration',
				emoji: '🛠',
				hidden: true,
			},
			{
				name: 'Development',
				emoji: '🖥️',
				hidden: false,
			},
		])
		.setDefaultPrefix('++')
		.setColor(0xffb6c1.toString());

	test = wok;

	let stateswitch = false;

	setInterval(() => {
		stateswitch = !stateswitch; //change state
		if (stateswitch) client.user!.setActivity(`++help`, { type: "LISTENING" });
		else client.user!.setActivity(`${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} Members | ${client.guilds.cache.size} Servers`, { type: "WATCHING" });
	}, 10000); //10 second delay

	const servers = client.guilds.cache.size;
	const members = client.guilds.cache.reduce((c, g) => c + g.memberCount, 0);

	setInterval(() => {
		const channel = client.channels.cache.get('844048451385688154') as TextChannel;
		const channel2 = client.channels.cache.get('844049248534003722') as TextChannel;
		channel.setName(`Total Guilds: ${servers}`);
		channel2.setName(`Total Users: ${members}`);
	}, 180000);

	const poster = new dbots.Poster({
		client,
		apiKeys: {
			topgg: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4NDk5NDU1NzQ4OTE4NDc3OSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjI0NDY2MzMzfQ.uRdXWB8e7tDhsEz36wDjEh5CxNrcjNShnaC8dKWdmnU',
		},
		clientLibrary: 'discord.js'
	});
	poster.startInterval();
});

client.on('message', (message) => {
	if (message.mentions.users.has(client.user!.id)) {
		const newEmbed = new DiscordJS.MessageEmbed()
			.setColor('#FFB6C1')
			.setDescription(`<:ahega0:842838420807483402>~**My current prefix is:**   ` + "`" + `${test.getPrefix(message.guild!.id)}` + "`");
		message.channel.send(newEmbed);
	}
});


client.login(process.env.token);