import { Container } from 'inversify';
import { COMPONENT } from '../shared/types/component.enum.js';
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

  restApplicationContainer.bind<RestApplication>(COMPONENT.REST_APPLICATION).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(COMPONENT.LOGGER).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(COMPONENT.CONFIG).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(COMPONENT.DATABASE_CLIENT).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(COMPONENT.EXCEPTION_FILTER).to(AppExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(COMPONENT.HTTP_EXCEPTION_FILTER).to(HttpErrorExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(COMPONENT.VALIDATION_EXCEPTION_FILTER).to(ValidationExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<PathTransformer>(COMPONENT.PATH_TRANSFORMER).to(PathTransformer).inSingletonScope();

  return restApplicationContainer;
}
