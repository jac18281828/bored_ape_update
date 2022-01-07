import * as winston from "winston" 
const { combine, timestamp, printf } = winston.format

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`
})

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), customFormat),
  transports: [
    //new winston.transports.File({ filename: "creator.log" }),
    new winston.transports.Console()
  ]
})
