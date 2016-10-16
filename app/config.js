var fs = require('fs');
var storage = require('azure-storage');

/**
* Reads the configurations.
* @ignore
*
* @return {Object}
*/
function readConfig() {
  return JSON.parse(fs.readFileSync('./app.config', 'utf8'));
}

module.exports = readConfig();