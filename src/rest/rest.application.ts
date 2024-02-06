import { Logger } from '../shared/interfaces/logger.interface.js';
import { Config } from '../shared/interfaces/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/types/component.enum.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
