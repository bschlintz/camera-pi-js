var config = require('./config');
var azure = require('azure-storage');
var moment = require('moment');

var blobSvc = azure.createBlobService(config.blobStorageConnection);

var UploadPicture = function(path, cb){
    var filename = moment().format('YYYY-MM-DD-HHmm-ss');
    blobSvc.createBlockBlobFromLocalFile(config.blobContainerName, filename, path, function(error, result, response){
        if(!error){
            // file uploaded
            console.log("blob uploaded: " + filename);
            cb();
        }else{
            console.log(error);
        }
    });

}

exports.UploadPicture = UploadPicture;