var fs = require('fs');

function readConfig() {
  return JSON.parse(fs.readFileSync('./app.config', 'utf8'));
}

module.exports = readConfig();