import DailyRotateFile from "winston-daily-rotate-file";
import * as winston from 'winston';

export class Logger {

    static logger;

    static info = (message) => {
        Logger.logger.log({level: 'info', message})
    }

    static err = (message) => {
        Logger.logger.log({
            level: 'error',
            message,
        })
    }

    static initLogger = () => {
        this.logger = winston.createLogger({
                transports: [
                    new DailyRotateFile({
                        dirname: 'logs',
                        filename: 'app-%DATE%-log',
                        datePattern: 'YYYY-MM-DD',
                        zippedArchive: true,
                        maxSize: '20m',
                        maxFiles: '14d'
                    }),
                    new winston.transports.Console()
                ],
        });
    }

}

