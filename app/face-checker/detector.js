var Faced = require('faced');
var faced = new Faced();

exports.detect = (path) => {
    return new Promise((resolve, reject) => {
        faced.detect(path, function (faces, image, file) {
            if (faces && faces.length) {
                var face = faces[0];

                console.log(
                    "Found a face at %d,%d with dimensions %dx%d",
                    face.getX(),
                    face.getY(),
                    face.getWidth(),
                    face.getHeight()
                );

                console.log(
                    "What a pretty face, it %s a mouth, it %s a nose, it %s a left eye and it %s a right eye!",
                    face.getMouth() ? "has" : "does not have",
                    face.getNose() ? "has" : "does not have",
                    face.getEyeLeft() ? "has" : "does not have",
                    face.getEyeRight() ? "has" : "does not have"
                );

                resolve();
                
            } else {
                console.log("No faces found!");
                reject();
            }
            
        });
    });
};