// var createGuid = require('node-uuid').v4;
var droopyIot = require('droopy-iot');
var iot = droopyIot.register("bs-debugger");
var ledPanel = require('./app/led-panel');

// iot.trigger("take-pic", { id: createGuid() }, "mke-room1")

iot.register("find-face", (payload) => {
    // Only supports one at a time, so kill anything that may have been active
    findaFace.stop();
    ledPanel.showColor("YELLOW");

    // scan for a face for 10 seconds
    findaFace.start(10000);

    findaFace.on("success", (filepath) => {
        //upload to azure
        ledPanel.showColor("GREEN");
    });

    findaFace.on("timeout", () => {
        ledPanel.showColor("RED");
    });

    findaFace.on("error", (err) => {
        console.log(error)
        ledPanel.showColor("RED");
    });
});


// ledPanel.toggle(ledPanel.leds.GREEN, false);
// ledPanel.toggle(ledPanel.leds.RED, false);
// ledPanel.toggle(ledPanel.leds.YELLOW, false);

// // ledPanel.toggle(ledPanel.leds.GREEN, true);
// // ledPanel.toggle(ledPanel.leds.RED, true);
// // ledPanel.toggle(ledPanel.leds.YELLOW, true);

// var gIv, yIv, rIv;

// gIv = setInterval(function () {
//   ledPanel.toggle(ledPanel.leds.GREEN);
// }, 200);

// setTimeout(() => {
//     yIv = setInterval(function () {
//         ledPanel.toggle(ledPanel.leds.YELLOW);
//     }, 200);
// }, 50)

// setTimeout(()=>{
//     rIv = setInterval(function () {
//         ledPanel.toggle(ledPanel.leds.RED);
//     }, 200);
// }, 100)

// // Stop blinking the LED and turn it off after 5 seconds.
// setTimeout(function () {
//     // Stop blinking
//     clearInterval(gIv); 
//     clearInterval(yIv);
//     clearInterval(rIv);
    
//     // Turn LEDs off
//     ledPanel.toggle(ledPanel.leds.GREEN, false);
//     ledPanel.toggle(ledPanel.leds.YELLOW, false);
//     ledPanel.toggle(ledPanel.leds.RED, false);

//     // Unexport GPIO and free resources
//     ledPanel.dispose();
// }, 30000);