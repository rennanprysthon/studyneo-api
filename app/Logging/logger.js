const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  exceptionHandlers: [
    new transports.File({
      filename:
        __dirname + `/exceptions/errors - ${new Date().toDateString()}.log`,
    }),
  ],
  transports: [
    new transports.File({
      filename: __dirname + `/logs/errors - ${new Date().toDateString()}.log`,
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.simple(),
        format.colorize()
      ),
    }),
  ],
});

module.exports = logger;
