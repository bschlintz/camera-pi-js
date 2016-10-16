var server = require('./app/server');
var camera = require('./app/camera');
var upload = require('./app/upload');
var watcher = require('./app/watcher');
// server.Start();
// camera.takePicture();
// upload.UploadPicture("C:\\dev\\git-me\\iot\\camera-pi-js\\SamplePic.jpg");

watcher.checkForRequests();