module.exports = function(pre, done) {
    var middleware = [];

    var func = function(...args) {
        if (done) middleware.push(done);

        return middleware.reduce( (chain, fn) => chain.then(fn)
                , Promise.resolve(pre.apply(null, args)))
    };

    func.use = function(fn){  
        middleware.push(fn);
    };

    return func;
};