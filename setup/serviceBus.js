var config = require('./app/config');
var azure = require('azure');
var _svc = null;

//Util Funcs
var _deleteDefaultRule = function(topicName, subName) {
    _svc.deleteRule(topicName, subName, azure.Constants.ServiceBusConstants.DEFAULT_RULE_NAME, _handleError);
}
var _handleError = function(error){
    error && console.log(error);
}
var _createRule = function(topicName, subName, filterExpr) {
    _svc.createRule(topicName, subName, subName + '-filter', { sqlExpressionFilter: filterExpr }, _handleError);
}

exports.setup = function(){
    //Get Connected
    _svc = azure.createServiceBusService(config.serviceBusConnection);

    //Create Service Bus Topic
    var topicOptions = { MaxSizeInMegabytes: '5120', DefaultMessageTimeToLive: 'PT1M' };
    _svc.createTopicIfNotExists(config.serviceBusTopicName, topicOptions, function(error){
        if(!error){
            console.log('topic created: ' + config.serviceBusTopicName)
        }
    });

    //Create Subscriptions for each room 
    config.serviceBusTopicSubscriptions.forEach(function(subName){
        _svc.createSubscription(config.serviceBusTopicName, subName, function (error){
            if(!error){
                //Remove Default Rule
                _deleteDefaultRule(config.serviceBusTopicName, subName);

                // Create Room Filter Rule
                _createRule(config.serviceBusTopicName, subName, 'room == ' + subName);
            }
        });
    });
}