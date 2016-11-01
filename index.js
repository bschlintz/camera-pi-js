var config = require('./app/config');
var middlewarify = require('./app/middlewarify');
var droopyIot = require('droopy-iot');
var azurePiCam = require('./app/azure-pi-cam');
var faceChecker = require('./app/face-checker');

console.log(`registering as: ${config.currentRoom}`);
var iot = droopyIot.register(config.currentRoom);

var eventName1 = "take-pic";
console.log(`subscribing to event: '${eventName1}'`);
iot.subscribe(eventName1, (payload) => {
    console.log(`received event: '${eventName1}'`);
    console.log('payload:' + payload);

    azurePiCam.takePicAndUpload.use(data => {
        return new Promise((resolve, reject) => {
            console.log(`middleware face checker starting`); 
            data.lastOperation = 'faceChecker';            

            faceChecker.checkOnce(data.config.imagePath)
                .then(result => {
                    data.status = 'success';
                    console.log(`middleware face checker done (outcome: ${data.status})`); 
                    resolve(data);
                })
                .catch(error => {
                    data.status = 'fail';
                    console.log(`middleware face checker done (outcome: ${data.status})`);                     
                    reject(data);
                })
        });
    });

    azurePiCam.takePicAndUpload(config).then(result => {
        console.log(`finished processing event: ${eventName1}`);
    })
});