exports.setup = function(){
    require('./blobStorage').setup();
    require('./serviceBus').setup();
};
