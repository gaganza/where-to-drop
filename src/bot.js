const Discord = require('discord.js');
const client = new Discord.Client();
const { CALDERA_LOCATIONS, REBIRTH_ISLAND_LOCATIONS } = require('./constants');

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
    usage: ![OPTION]
      p, ping:\t\t\t ping for a location in the Caldera map

      r, rebirth:\t\t\t pring for a location in the Rebirth Island map

      l, list:\t\t\t list out all the locations for all maps

      h, help:\t\t\t print this help message
  `;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (message.content.substring(0, 1) == '!') {
    let args = message.content.substring(1).split(' ');
    const cmd = args[0].toLowerCase();
    args = args.splice(1);

    switch (cmd) {
      case 'p':
      case 'ping':
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
