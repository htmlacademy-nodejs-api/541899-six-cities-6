import { Logger } from '../../interfaces/logger.interface.js';
import { Logger as PinoInstance, pino, transport } from 'pino';
import { resolve } from 'node:path';
import { injectable } from 'inversify';

const PATH_TO_LOGS = './src/logs/rest.log';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          level: 'debug',
          options: { destination: resolve(PATH_TO_LOGS) },
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        },
      ]
    });

    this.logger = pino({}, multiTransport);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
