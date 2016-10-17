// var setup = require('./setup').setup();

// var mock = require('./mock/messenger');
// mock.sendPictureRequest('mke-room1');

// var watcher = require('./app/watcher');
// watcher.checkForRequests(false, 5000);

var server = require('./app/server');
server.Start();