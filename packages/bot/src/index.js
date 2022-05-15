const Discord = require('discord.js');
const client = new Discord.Client();
const { CALDERA_LOCATIONS, REBIRTH_ISLAND_LOCATIONS } = require('@where-to-drop/shared');

let auth;

try {
  auth = require('./auth.json');
} catch (error) {
  auth = { token: process.env.TOKEN };
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLocation(map) {
  return map[getRandomInteger(0, map.length - 1)];
}

function getAllLocations(map) {
  return Object.values(map);
}

function getHelpMessage() {
  return `
    usage: @Where to Drop - Warzone [OPTION]
      c, caldera\t\t\t for a location in the Caldera map

      r, rebirth\t\t\t for a location in the Rebirth Island map
      
      l, list:\t\t\t list out all the locations for all maps
      
      h, help:\t\t\t print this help message

    NOTE: ![OPTION] is deprecated
  `;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (message.mentions.has(client.user.id)) {
    const [_mention, cmd] = message.content.split(' ');

    switch (cmd) {
      case 'c':
      case 'caldera':
        message.reply(getRandomLocation(CALDERA_LOCATIONS));
        break;

      case 'r':
      case 'rebirth':
        message.reply(getRandomLocation(REBIRTH_ISLAND_LOCATIONS));
        break;

      case 'l':
      case 'list':
        const calderaLocations = getAllLocations(CALDERA_LOCATIONS).join(', ');
        const rebirthLocations = getAllLocations(REBIRTH_ISLAND_LOCATIONS).join(', ');

        message.reply(
          `
          Caldera locations: ${calderaLocations}
          Rebirth Island locations: ${rebirthLocations}
          `,
        );
        break;

      case 'h':
      case 'help':
        message.reply(getHelpMessage());
        break;

      default:
        message.reply(getHelpMessage());
        break;
    }
  }
});

client.login(auth.token);
