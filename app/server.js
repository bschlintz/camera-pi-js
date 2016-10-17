var express = require('express');
var app = express();
var watcher = require('./app/watcher');

app.post('/', function (req, res) {
    res.send('POST received!');
});

var Start = function(){
    app.listen(3000, function () {
        console.log('Running on :3000');
        watcher.checkForRequests(false, 5000);
    });
} 

exports.Start = Start;