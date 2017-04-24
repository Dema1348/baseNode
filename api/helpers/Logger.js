var dateFormat = require('dateformat');

var logger = null;

function getLogger() {
    if (logger == null) {
        winston = require('winston');
        logger = new(winston.Logger)({
            transports: [
                new(winston.transports.Console)({
                    timestamp: function() {
                        var now = Date.now();
                        return dateFormat(now, "dd-mm-yyyy HH:MM:ss");
                    },
                    formatter: function(options) {
                        // Return string will be passed to logger.
                        return '[' + options.timestamp() + ']:[' + options.level.toUpperCase() + ']:' + (undefined !== options.message ? options.message : '') +
                            (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
                    }
                })
            ]
        });
        // logger.level = Common.getEnv() == 'production' ? 'info' : 'debug';
        logger.level = 'debug';
    }

    return logger;
}

var debug = function(message) {
    getLogger().debug(message);
};

var error = function(message) {
    getLogger().error(message);
};

var info = function(message) {
    getLogger().info(message);
};

var warn = function(message) {
    getLogger().warn(message);
};

module.exports.debug = debug;
module.exports.error = error;
module.exports.info = info;
module.exports.warn = warn;
