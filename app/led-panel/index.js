// https://github.com/fivdi/onoff

var Gpio = require('onoff').Gpio;

var ledPanel = {};
ledPanel.leds = {
    GREEN: 5,
    YELLOW: 6,
    RED: 13
}

ledPanel.showColor = function(color) {
    // turn off everything
    Object.keys(ledPanel.leds).forEach(key => ledPanel.toggle(ledPanel.leds[key], false));
    // show the target color
    ledPanel.toggle(ledPanel.leds[color], true);
};

ledPanel.toggle = function(pin, state) {
    console.log(`LED: ${pin}  STATE: ${state === undefined ? "toggle" : state}`);
    var led = _leds[pin];
    if(state === undefined){
        led.writeSync(led.readSync() ^ 1);
    } else {
        led.writeSync(state ? 0 : 1);
    }
}

ledPanel.dispose = function() {
    Object.keys(_leds).forEach(k => _leds[k].unexport());
}

var _leds = {};
var _isInitialized = false;
var _init = function(){
    if (!_isInitialized){
        Object.keys(ledPanel.leds).forEach(k => _leds[ledPanel.leds[k]] = new Gpio(ledPanel.leds[k], 'out'));
        _isInitialized = true;
    }
};

_init();
module.exports = ledPanel;
