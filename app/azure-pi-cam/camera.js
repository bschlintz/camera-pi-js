// Docs: https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspistill.md

var exec = require('child_process').exec;

exports.takePicture = function(data){
    console.log('starting takePicture');
    var config = data;
    var cameraCliCmd = `raspistill -o ${config.imagePath} -h ${config.imageHeight} -w ${config.imageWidth} -t 1`;
    return new Promise((resolve, reject) => {
        exec(cameraCliCmd, (error, stdout, stderror) => {
            console.log('finished takePicture');
            var data = {};
            
            data.lastOperation = 'takePicture';
            data.status = error ? error : 'success';
            data.config = config;
            
            error ? reject(data) : resolve(data);
        });
    });
};