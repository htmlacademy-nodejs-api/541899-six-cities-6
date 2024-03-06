import { Config } from '../../interfaces/config.interface.js';
import { config } from 'dotenv';
import { Logger } from '../../interfaces/logger.interface.js';
import { CONFIG_REST_SCHEMA, RestSchema } from './rest.schema.js';
import { inject, injectable } from 'inversify';
import { COMPONENT } from '../../types/component.enum.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file');
    }

    CONFIG_REST_SCHEMA.load({});
    CONFIG_REST_SCHEMA.validate({ allowed: 'strict', output: this.logger.info });

    this.config = CONFIG_REST_SCHEMA.getProperties();
    this.logger.info('.env file successfully parsed!');
  }

  get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
