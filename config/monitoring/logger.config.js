const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'gray'
};

winston.addColors(colors);

// Create the log directory if it doesn't exist
const logDir = path.join(__dirname, '../../logs');

// Define format for logs
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Console format with colors
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `${timestamp} [${level}]: ${message}${metaStr}`;
  })
);

// Create transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format: consoleFormat,
    level: process.env.LOG_LEVEL || 'info'
  }),
  
  // Daily rotate file for all logs
  new DailyRotateFile({
    filename: path.join(logDir, 'application-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: logFormat,
    level: 'info'
  }),
  
  // Daily rotate file for error logs
  new DailyRotateFile({
    filename: path.join(logDir, 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    format: logFormat,
    level: 'error'
  }),
  
  // Performance logs
  new DailyRotateFile({
    filename: path.join(logDir, 'performance-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
    format: logFormat,
    level: 'info',
    filter: (info) => info.type === 'performance'
  })
];

// Create logger instance
const logger = winston.createLogger({
  levels,
  transports,
  exitOnError: false,
  // Handle uncaught exceptions
  exceptionHandlers: [
    new winston.transports.File({ 
      filename: path.join(logDir, 'exceptions.log'),
      format: logFormat
    })
  ],
  // Handle unhandled promise rejections
  rejectionHandlers: [
    new winston.transports.File({ 
      filename: path.join(logDir, 'rejections.log'),
      format: logFormat
    })
  ]
});

// Create a stream object for Morgan integration
logger.stream = {
  write: (message) => {
    logger.http(message.trim());
  }
};

module.exports = logger;