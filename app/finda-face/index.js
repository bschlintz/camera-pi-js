var EventEmitter = require("events");
var piCam = require('../pi-cam');
var watch = require("chokidar").watch;
var findaFace = new EventEmitter();
var faceDetector = require("./faceDetector");

findaFace._isRunning = false;
findaFace._faceFound = false;
var watcher;

var defaults = {
    imagePath: "./images/timelapse.jpg",
    width: 1028,
    height: 768
};

var reset = function() {
    piCam.kill();
    findaFace._isRunning = false;
    findaFace._faceFound = false;
    closeWatcher();
};

var closeWatcher = function() {
    if (watcher && watcher.close) {
        watcher.close();
        watcher = null;
    }
};

findaFace.start = function(duration, opts) {
    if (findaFace._isRunning) throw new Error("Finda-Face is already runnng!");
    reset();
    findaFace._isRunning = true;

    // how fast can this thing process? are you running on a pi 3? I think we need it to be able to do at least 2 a second.
    var interval = 1000;
    opts = Object.assign({}, defaults, opts);
    
    // Start the timelapse
    piCam.timelapse(duration, interval, opts).then(result => {
        //TODO: this may fire if process is manually killed. Not sure how that will affect logic
        if (findaFace._isRunning) findaFace.emit("timeout");
        reset();
    });

    // now that the timelapse is running, fire an event every time we have a new image
    watchFile(opts.imagePath, checkForFace);
};

findaFace._handleFaceFound = function(filepath) {
    // kill the timelapse
    piCam.kill();
    // emit the face found event
    findaFace.emit("success", filepath)
    // reset
    reset();
};

var watchFile = function(filepath, onChange) {
    closeWatcher();
    watcher = watch(filepath);
    watcher.on("change", onChange)
    watcher.on("add", onChange);
};

var checkForFace = function(filepath, fileStats) {
    faceChecker.detect(filepath)
        .then(faces => {
            findaFace._handleFaceFound(filepath, faces);
        })
        .catch(() => {
            // Do nothing. wait for the next timelapse image
            console.log("No face found");
        })
};

findaFace.stop = function() {
    reset();
};
module.exports = findaFace;
