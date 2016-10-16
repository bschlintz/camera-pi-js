var azure = require('azure');
var camera = require('./camera');
var config = require('./config');

var Watcher = {};


var opts = {
    MaxSizeInMegabytes: '5120',
    DefaultMessageTimeToLive: 'PT1M'
};
var sbTopicName = "PictureTaker";
var sbSubName = "Requests";

var _init = function(){
    Watcher._serviceBus = azure.createServiceBusService(config.serviceBusConnection);
    Watcher._serviceBus.createTopicIfNotExists(sbTopicName, opts, function(error){
        if(error){
            console.log(error);
        }
    });
};

Watcher.checkForRequests = function(){
    if (!Watcher._serviceBus){
        _init();
    }    
    Watcher._serviceBus.receiveSubscriptionMessage(sbTopicName, sbSubName, { isPeekLock: true }, function(error, lockedMessage){
        if(!error){
            // Message received and locked
            console.log('received message:' + lockedMessage);

            camera.takePicture(function(){
                Watcher._serviceBus.deleteMessage(lockedMessage, function (deleteError){
                    if(!deleteError){
                        // Message deleted
                        console.log('message has been processed.');
                    }
                });
            });
            
        } else {
            console.log(error);
        }
    });
}

module.exports = Watcher;