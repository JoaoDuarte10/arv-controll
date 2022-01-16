"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
const myFormat = printf(({ timestamp, level, message }) => {
    return `Date: [${timestamp}] Level: [${level}] Message: { ${message} }`;
});
const logger = (0, winston_1.createLogger)({
    format: combine(winston_1.format.splat(), winston_1.format.simple(), timestamp(), myFormat),
    transports: [
        new winston_1.transports.File({
            filename: 'logs/errors.log',
            level: 'error',
        }),
        new winston_1.transports.File({
            filename: 'logs/info.log',
            level: 'info',
        })
    ],
});
exports.logger = logger;
