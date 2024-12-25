const { createLogger, format, transports } = require('winston');

const transportsList = [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ];
  
if (process.env.NODE_ENV !== 'production') {
    transportsList.push(new transports.Console());
  }
  
const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: transportsList,
  });
  
module.exports = logger;
  