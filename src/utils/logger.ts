import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ timestamp, level, message }) => {
  return `Date: [${timestamp}] Level: [${level}] Message: { ${message} }`;
});

const logger = createLogger({
  format: combine(format.splat(), format.simple(), timestamp(), myFormat),
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

export { logger };
