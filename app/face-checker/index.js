var detector = require('./detector');

var faceChecker = {};

faceChecker.checkOnce = (path) => {
    return detector.detect(path);
}

faceChecker.start = (timeout, path) => {
    
}

module.exports = faceChecker;