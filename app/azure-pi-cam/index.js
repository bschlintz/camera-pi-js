var middlewarify = require('../middlewarify');
var camera = require('./camera'); 
var blobStorage = require('./blobStorage');


module.exports = (function() {

    return {
        takePicAndUpload: middlewarify(camera.takePicture, blobStorage.uploadPicture)
    };
    
})();