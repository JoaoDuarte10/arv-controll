/* eslint-disable @typescript-eslint/no-explicit-any */
import winston, { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const customFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} | ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(format.splat(), format.simple(), timestamp(), customFormat),
  transports: [
    new transports.File({
      filename: 'logs/errors.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
    }),
  ],
});

if (process.env.WINSTON_CONSOLE_LOG === 'true') {
  logger.add(
    new winston.transports.Console({
      format: combine(
        format.colorize(),
        format.splat(),
        format.simple(),
        timestamp(),
        customFormat,
      ),
    }),
  );
}

abstract class ILogger {
  constructor(readonly info: any, readonly error: any) {}
}
export { logger, ILogger };
