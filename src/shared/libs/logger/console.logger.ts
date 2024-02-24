import { Logger } from '../../interfaces/logger.interface.js';

export class ConsoleLogger implements Logger {
  debug(message: string, ...args: unknown[]): void {
    console.debug(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    console.error(message, ...args);
    console.error(`Error message: ${error.message}`);
  }

  info(message: string, ...args: unknown[]): void {
    console.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(message, ...args);
  }
}
