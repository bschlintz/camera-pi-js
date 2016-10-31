var config = require('./app/config');
var middlewarify = require('./app/middlewarify');
var droopyIot = require('droopy-iot');
var azurePiCam = require('./app/azure-pi-cam');

console.log(`registering as: ${config.currentRoom}`);
var iot = droopyIot.register(config.currentRoom);

var eventName1 = "take-pic";
console.log(`subscribing to event: '${eventName1}'`);
iot.subscribe(eventName1, (payload) => {
    console.log(`received event: '${eventName1}'`);
    console.log('payload:' + payload);

    azurePiCam.takePicAndUpload.use(data => {
        console.log(`middleware check status: ${data.status}`); 

        data.lastOperation = 'middlewareCheck';
        data.status = 'success';

        return data;
    });

    azurePiCam.takePicAndUpload(config).then(result => {
        console.log(`finished processing event: ${eventName1}`);
    })
});

// iot.subscribe("take-pic-recognize", (payload) => {
//     console.log(payload);
// });