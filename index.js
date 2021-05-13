const DiscordJS = require('discord.js');
const WOKCommands = require('wokcommands');
require('dotenv').config

const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'REACTION'],
});

client.on('ready', () => {
  const wok = new WOKCommands(client, {
    commandDir: 'commands',
    featureDir: 'features',
    messagePath: '',
    showWarns: false,
    testServers: ['790889521734352966'],
    del: 5,
  })
  .setMongoPath('mongodb+srv://admin:admin@cluster0.inm1g.mongodb.net/test?authSource=admin&replicaSet=atlas-yeiffe-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
  .setCategorySettings([
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
    {
      name: 'Fun',
      emoji: '😂',
      hidden: false,
    },
  ])
  .setDefaultPrefix('++')
  .setColor(0xffb6c1);

  const { slashCommands } = wok;
});

client.login('ODQxNzc3NDQxMTE3ODMxMTg5.YJrsVQ.Mt6m4EWjN4Eh2c8sqwEQo5ZZn0M');