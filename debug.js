var createGuid = require('node-uuid').v4;
var droopyIot = require('droopy-iot');
var iot = droopyIot.register("bs-debugger");
iot.trigger("take-pic", { id: createGuid() }, "mke-room1")