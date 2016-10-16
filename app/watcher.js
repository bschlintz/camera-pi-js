var config = require('./config');
var azure = require('azure');
var camera = require('./camera');

var pollFreqMs = 1000;
var opts = {
    timeoutIntervalInS: 10,
    isPeekLock: true
}

var Watcher = {};

var _init = function(){
    Watcher._serviceBus = azure.createServiceBusService(config.serviceBusConnection);
};

var _closeMessage = function(message){
    Watcher._serviceBus.deleteMessage(message, function (deleteError){
        if(!deleteError){
            // Message deleted
            console.log('message has been processed.');
        }
    });
}

var _checkForMessages = function(){
    Watcher._serviceBus.receiveSubscriptionMessage(config.serviceBusTopicName, config.currentRoom, opts, function(error, lockedMessage){
        if(!error){
            // Message received and locked
            console.log('received message:' + lockedMessage);

            // camera.takePicture(function(){
            //     _closeMessage(lockedMessage);
            // });
            _closeMessage(lockedMessage);            
            
        } else {
            console.log(error);
        }
    });
}

Watcher.checkForRequests = function(isPoll){
    if (!Watcher._serviceBus){
        _init();
    }
    
    _checkForMessages();
    
    if (isPoll) {
        setInterval(_checkForMessages, pollFreqMs);
    }
}

module.exports = Watcher;