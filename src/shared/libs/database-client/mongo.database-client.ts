import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';
import { DatabaseClient } from '../../interfaces/database-client.interface.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../interfaces/logger.interface.js';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    this.isConnected = false;
  }

  isConnectedToDatabase() {
    return this.isConnected;
  }

  async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client is already connected');
    }

    this.logger.info('Trying to connect to MongoDB...');

    let attempt = 0;

    while (attempt < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('DB connection has been established');
        return;
      } catch (error) {
        attempt++;
        this.logger.info(`Error while trying to connect to DB. Attempt #${attempt}`, error as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(`Failed to establish connection after ${RETRY_COUNT} tries`);
  }

  async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('No DB connection');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;

    this.logger.info('DB has been disconnected');
  }
}
