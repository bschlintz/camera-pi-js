// Docs: https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspistill.md
var exec = require('child_process').exec;

var defaults = {
    imagePath: "./images/picam.jpg",
    height: 2000,
    width: 1300,
    duration: 1
};
var _process;

var killProcess = exports.kill = function() {
    if (_process) _process.kill();
    _process = null;
};

exports.takePicture = function(opts){
    var config  = Object.assign({}, defaults, opts);
    return raspiStill("takePicture", config);
};

exports.timelapse = function(duration, interval, opts) {
    var config  = Object.assign({}, defaults, opts);
    config.duration = intParse(duration, 10);
    config.interval = intParse(interval, 10);
    return raspiStill("timelapse", config)
}

var raspiStill = function(cmdName, config) {
    console.log(`Starting ${cmdName}...`)
    var cmd = `raspistill -o ${config.imagePath} -h ${config.imageHeight} -w ${config.imageWidth} -t ${config.duration}`
    if (config.interval) cmd += ` -tl ${config.interval}`

    runExec(cmd).then(stdout => {
        console.log(`Finished ${cmdName}.`)
        return {
            lastOperation: cmdName,
            status: "success",
            config
        };
    });
};

var runExec = function(cmd) {
    killProcess();
    return new Promise((resolve, reject) => {
        _process = exec(cmd, (err, stdout, stderror) => {
            _process = null;
            if (err) reject(err)
            else resolve(stdout)
        });
    });
};