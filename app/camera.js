var opts = {
    mode: "photo",
    encoding: "jpg",
    output: "./picam.jpg",
    width: 640,
    height: 480,
    quality: 100,
    timeout: 3
};

var RaspiCam = require("raspicam");
var camera = new RaspiCam({ opts });

var TakePicture = function(){
    console.log("BEGIN: TakePicture");
    camera.start();
    console.log("END: TakePicture");    
}

exports.TakePicture = TakePicture;