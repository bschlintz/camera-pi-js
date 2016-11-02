var Faced = require('faced');
var faced = new Faced();

exports.detect = (path) => {
    return new Promise((resolve, reject) => {
        faced.detect(path, function (faces, image, file) {
            if (faces && faces.length) {
                resolve(faces);
            } else {
                reject("No faces found!");
            }
        });
    });
};