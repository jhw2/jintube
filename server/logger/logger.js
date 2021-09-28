const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const moment = require('moment');
 
const timeStampFormat = ()=> {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');                            
};

//logger 설정 
module.exports.logger = winston.createLogger({
    transports: [
        new (winstonDaily)({
            name: 'info-file',
            filename: './server/logs/info/info', 
            datePattern: 'YYYY-MM-DD',
            colorize: false, 
            maxsize: 50000000, 
            maxFiles: 1000, 
            level: 'info',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        }),
        new (winston.transports.Console)({
            name: 'debug-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        })
    ],
    exceptionHandlers: [
        new (winstonDaily)({
            name: 'error-file',
            filename: './server/logs/error/error',
            datePattern: 'YYYY-MM-DD',
            colorize: false,
            maxsize: 50000000,
            maxFiles: 1000,
            level: 'error',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        }),
        new (winston.transports.Console)({
            name: 'exception-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        })
    ]
});