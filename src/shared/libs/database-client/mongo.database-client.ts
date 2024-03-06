import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';
import { DatabaseClient } from '../../interfaces/database-client.interface.js';
import { COMPONENT } from '../../types/component.enum.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { DATABASE } from './database.constants.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger,
  ) {
    this.isConnected = false;
  }

  checkIsConnectedToDatabase() {
    return this.isConnected;
  }

  async connect(uri: string): Promise<void> {
    if (this.checkIsConnectedToDatabase()) {
      throw new Error('MongoDB client is already connected');
    }

    this.logger.info('Trying to connect to MongoDB...');

    let attempt = 0;

    while (attempt < DATABASE.RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('DB connection has been established');
        return;
      } catch (error) {
        attempt++;
        this.logger.info(`Error while trying to connect to DB. Attempt #${attempt}`, error as Error);
        await setTimeout(DATABASE.RETRY_TIMEOUT);
      }
    }

    throw new Error(`Failed to establish connection after ${DATABASE.RETRY_COUNT} tries`);
  }

  async disconnect(): Promise<void> {
    if (!this.checkIsConnectedToDatabase()) {
      throw new Error('No DB connection');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;

    this.logger.info('DB has been disconnected');
  }
}
