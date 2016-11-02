var middlewarify = require('../middlewarify');
var camera = require('../pi-cam'); 
var blobStorage = require('./blobStorage');


module.exports = (function() {

    return {
        takePicAndUpload: middlewarify(camera.takePicture, blobStorage.uploadPicture)
    };
    
})();