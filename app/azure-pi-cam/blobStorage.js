var azure = require('azure-storage');
var moment = require('moment');

exports.uploadPicture = function(data){
    console.log('starting uploadPicture');
    // console.log(data);
    var config = data.config;
    var blobSvc = azure.createBlobService(config.blobStorageConnection);
    var filename = moment().format('YYYY-MM-DD-HHmm-ss');
    return new Promise((resolve, reject) => {
        blobSvc.createBlockBlobFromLocalFile(config.blobContainerName, filename, config.imagePath, (error, result, response) => {
            console.log("blob uploaded: " + filename);

            data.lastOperation = 'uploadPicture';
            data.status = error ? error : 'success';
            data.azureBlobFilename = filename;
            
            error ? reject(data) : resolve(data);
        });
    });
}