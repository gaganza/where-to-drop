const Discord = require('discord.js');
const client = new Discord.Client();
const LOCATIONS = require('./constants').LOCATIONS;

let auth;
try {
  auth = require('./auth.json');
} catch (error) {
  auth = { token: process.env.TOKEN };
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomVerdanskLocation() {
  return VERDANSK_LOCATIONS[randomInteger(0, LOCATIONS.length - 1)];
}
function getRandomRebirhtLocation() {
  return REBIRTH_LOCATIONS[randomInteger(0, REBIRTHLOCATIONS.length - 1)];
}

function getAllLocations() {
  return Object.values(LOCATIONS);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (message.content.substring(0, 1) == '!') {
    let args = message.content.substring(1).split(' ');
    let cmd = args[0].toLowerCase();
    args = args.splice(1);

    switch (cmd) {
      case 'p':
      case 'ping':
        message.reply(getRandomVerdanskLocation());

        break;
      case 'l':
      case 'list':
        message.reply(getAllLocations().join(', '));

        break;

      case 'r':
      case 'rebirth':
        message.reply(getRandomRebirhtLocation());

        break;
    }
  }
});
client.login(auth.token);
