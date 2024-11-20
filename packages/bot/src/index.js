const Discord = require('discord.js');
const client = new Discord.Client();
const {
  ALMAZRAH_LOCATIONS, 
  ASHIKA_ISLAND_LOCATIONS,
  CALDERA_LOCATIONS, 
  FORTUNES_KEEP_LOCATIONS,
  REBIRTH_ISLAND_LOCATIONS,
  URZIKSTAN_LOCATIONS,
  VONDEL_LOCATIONS,
  AREA_99
} = require('@where-to-drop/shared');

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
      9, area-99 - for a location in the Area 99 map

      a, al-marzah - for a location in the Al Marzah map
      
      c, caldera - for a location in the Caldera map

      r, rebirth - for a location in the Rebirth Island map

      f, fortunes-keep - for a location in the Fortune's Keep map
      
      ai, ashika-island - for a location in the Ashkia Island map

      u, urzikstan - for a location in the Urzikstan map

      v, vondel - for a location in the Vondel map
      
      l, list - list out all the locations for all maps
      
      h, help - print this help message

    NOTE: ![OPTION] is deprecated
  `;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  // ignore everyone mentions
  if (message.content.match(Discord.MessageMentions.EVERYONE_PATTERN) !== null) {
    return;
  }

  if (message.content.substring(0, 1) == '!') {
    message.reply(getHelpMessage());
  }

  if (message.mentions.has(client.user.id)) {
    const [_mention, cmd] = message.content.split(' ');

    switch (cmd) {
      case '9':
        message.reply(getRandomLocation(AREA_99));
        break;
      case 'a':
      case 'al-mazrah':
        message.reply(getRandomLocation(ALMAZRAH_LOCATIONS));
        break;

      case 'c':
      case 'caldera':
        message.reply(getRandomLocation(CALDERA_LOCATIONS));
        break;

      case 'r':
      case 'rebirth':
        message.reply(getRandomLocation(REBIRTH_ISLAND_LOCATIONS));
        break;

      case 'f':
      case 'fortunes-keep':
        message.reply(getRandomLocation(FORTUNES_KEEP_LOCATIONS));
        break;
        
      case 'ai':
      case 'ashika-island':
        message.reply(getRandomLocation(ASHIKA_ISLAND_LOCATIONS));
        break;

      case 'u':
      case 'urzikstan':
        message.reply(getRandomLocation(URZIKSTAN_LOCATIONS));
        break;

      case 'v':
      case 'vondel':
        message.reply(getRandomLocation(VONDEL_LOCATIONS));
        break;

      case 'l':
      case 'list':
        const almazrah = getAllLocations(ALMAZRAH_LOCATIONS).join(', ');
        const ashikaIslandLocations = getAllLocations(ASHIKA_ISLAND_LOCATIONS).join(', ');
        const calderaLocations = getAllLocations(CALDERA_LOCATIONS).join(', ');
        const rebirthLocations = getAllLocations(REBIRTH_ISLAND_LOCATIONS).join(', ');
        const fortunesKeepLocations = getAllLocations(FORTUNES_KEEP_LOCATIONS).join(', ');
        const urzikstanLocations = getAllLocations(URZIKSTAN_LOCATIONS).join(', ');
        const vondelLocations = getAllLocations(VONDEL_LOCATIONS).join(', ');
        const area99Locations = getAllLocations(AREA_99).join(', ');
        
        message.reply(
          `
          Al Mazrah locations: ${almazrah}
          Ashika locations: ${ashikaIslandLocations}
          Caldera locations: ${calderaLocations}
          Rebirth Island locations: ${rebirthLocations}
          Fortune's Keep locations: ${fortunesKeepLocations}
          Urzikstan locations: ${urzikstanLocations}
          Vondel locations: ${vondelLocations}
          Area 99 locations: ${area99Locations}
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
