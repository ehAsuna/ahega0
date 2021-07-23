import Discord from 'discord.js';
import { ICommand } from "../types/wokcommandstypes";
import beautify from 'js-beautify';
import fetch from 'node-fetch';
import { create } from "sourcebin";
import { IMetadata, ISource } from '../types/cdo';

function getSource(s: string) {
	//if(!s.includes("code.org")) return message.reply("Use the **link of the project.**").delete({timeout: 3500});
	const gameid = s.match(/studio\.code\.org\/projects\/[a-z]+\/([^/\t\n\r ]+)(\/[a-z]*)?(?![^\t\n\r ]+)([^]*)/)!;
	return fetch(
		`https://studio.code.org/v3/sources/${gameid[1]}/main.json`
	).then((r) => r.text());
}

const Command: ICommand = {
	aliases: ["grepC"],
	category: 'General',
	description: 'Returns entire CODE of a code.org game or app lab project.',
	cooldown: '5s',
	hidden: false,
	ownerOnly: false,
	guildOnly: true,
	testOnly: false,
	//slash: true,
	//globalCooldown: '10m', min of 1m!
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: '<link of project> !!APP OR GAME LAB ONLY!!',
	//permissions: ['SEND_MESSAGES'],


	callback: ({ message, client, args }) => {
		try {
			message.reply('Fetching source...').then(replee => {
				const gameid = args[0].match(/studio\.code\.org\/projects\/[a-z]+\/([^/\t\n\r ]+)(\/[a-z]*)?(?![^\t\n\r ]+)([^]*)/);
				Promise.all([fetch(`https://studio.code.org/v3/channels/${gameid![1]}`).then(res => res.json()), fetch(`https://studio.code.org/v3/sources/${gameid![1]}/main.json`).then(res => res.json())]).then(([metadata, source]: [IMetadata, ISource]) => {
					if (!metadata.name || metadata.name.trim() === "") {
						metadata.name = "Project Code"
					}
					let k = beautify(source.source, { indent_size: 2, space_in_empty_paren: true });
					create(
						[
							{
								name: "index.js",
								content: k,
								language: "JAVASCRIPT",
							},
						],
						{
							title: metadata.name,
							description: `Source code for the ${metadata.name} code.org project.`,
						},
					).then((bin) => {
						replee.delete()
						message.channel.send({
							"embed": {
								"title": metadata.name + " Source Code",
								"url": bin.url,
								"color": "BLACK",
								"thumbnail": {
									"url": `https://studio.code.org${metadata.thumbnailUrl}`
								},
								"author": {
									"name": message.author.tag,
									"icon_url": message.author.avatarURL()!,
								},
								"footer": {
									"text": "Fetched Project Created At"
								},
								"timestamp": new Date(metadata.createdAt.match(/(.+)\+00:00$/)![1]),
								"fields": [
									{
										"name": "Size",
										"value": source.source.length + " bytes",
										"inline": true,
									},
									{
										"name": "Type",
										"value": metadata.projectType,
										"inline": true,
									}
								]
							}
						})
					});
				});
			});
		} catch (e) {
			return message.reply("An error occured. Make sure to use the **link** of the project.")
		}
	}
}

export default Command;