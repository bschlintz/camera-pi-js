var config = require('../app/config');
var azure = require('azure');

var Messenger = {};
var _svc = null;

var _init = function(){
    _svc = azure.createServiceBusService(config.serviceBusConnection);
};

Messenger.sendPictureRequest = function(roomName) {
    !_svc && _init();
    
    var message = {
        body: 'Yo, ' + roomName + '! Take my pic!',
        customProperties: {
            room: roomName
        }
    }

    _svc.sendTopicMessage(config.serviceBusTopicName, message, function(error) {
        if (error) {
            console.log(error);
        }
    });
}

module.exports = Messenger;