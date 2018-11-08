const winston = require('winston');

global.log = winston.createLogger();
log.add(new winston.transports.Console({
    format: winston.format.simple()
}));
log.level = 'debug';
