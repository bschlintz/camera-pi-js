var RaspiCam = require("raspicam");
var upload = require('./upload');

var opts = {
    mode: "photo",
    output: "/home/pi/share/pics/picam.jpg",
    encoding: "jpg",
    quality: 100,
    timeout: 0 // take the picture immediately
}
var _callBack = null;

var Camera = {};
var _init = function(){
    Camera._camera = new RaspiCam(opts);
    Camera._camera.on("read", _onPictureTaken)
}

var _onPictureTaken = function( err, timestamp, filename ){
    console.log("photo image captured with filename: " + filename);

    setTimeout(function(){
        Camera._camera.stop();
        upload.UploadPicture("/home/pi/share/pics/picam.jpg", _callBack);       
    }, 1000);
}

Camera.takePicture = function(cb){
    _callBack = cb;
    if (!Camera._camera){
        _init();
    }
    Camera._camera.start();
}

module.exports = Camera;