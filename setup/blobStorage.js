var config = require('./app/config');
var azure = require('azure-storage');
var _svc = null;


exports.setup = function(){
    //Get Connected
    _svc = azure.createBlobService(config.blobStorageConnection);
    
    //Create Blob Container
    _svc.createContainerIfNotExists(config.blobContainerName, function(error, result, response){
        error && console.log(error);
    });
};