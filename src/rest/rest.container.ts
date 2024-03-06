import { Container } from 'inversify';
import { Component } from '../shared/types/component.enum.js';
import { Logger } from '../shared/interfaces/logger.interface.js';
import { Config } from '../shared/interfaces/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { DatabaseClient } from '../shared/interfaces/database-client.interface.js';
import { PinoLogger } from '../shared/libs/logger/pino.logger.js';
import { RestConfig } from '../shared/libs/config/rest.config.js';
import { MongoDatabaseClient } from '../shared/libs/database-client/mongo.database-client.js';
import { RestApplication } from './index.js';
import { AppExceptionFilter, ExceptionFilter, ValidationExceptionFilter } from '../shared/libs/rest/index.js';
import { PathTransformer } from '../shared/libs/rest/transform/path-transformer.js';
import { HttpErrorExceptionFilter } from '../shared/libs/rest/exception-filter/http-error.exception-filter.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<PathTransformer>(Component.PathTransformer).to(PathTransformer).inSingletonScope();

  return restApplicationContainer;
}
