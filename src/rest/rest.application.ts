import { Logger } from '../shared/interfaces/logger.interface.js';
import { Config } from '../shared/interfaces/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { inject, injectable } from 'inversify';
import { COMPONENT } from '../shared/types/component.enum.js';
import { DatabaseClient } from '../shared/interfaces/database-client.interface.js';
import { getMongoURI } from '../shared/helpers/database.js';
import express, { Express } from 'express';
import { Controller, ParseTokenMiddleware } from '../shared/libs/rest/index.js';
import { ExceptionFilter } from '../shared/libs/rest/index.js';
import cors from 'cors';
import { getFullServerPath } from '../shared/helpers/support-functions.js';
import { STATIC_UPLOAD_ROUTE } from './index.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT.CONFIG) private readonly config: Config<RestSchema>,
    @inject(COMPONENT.DATABASE_CLIENT) private readonly databaseClient: DatabaseClient,
    @inject(COMPONENT.EXCEPTION_FILTER) private readonly appExceptionFilter: ExceptionFilter,
    @inject(COMPONENT.USER_CONTROLLER) private readonly userController: Controller,
    @inject(COMPONENT.OFFER_CONTROLLER) private readonly offerController: Controller,
    @inject(COMPONENT.AUTH_EXCEPTION_FILTER) private readonly authExceptionFilter: ExceptionFilter,
    @inject(COMPONENT.HTTP_EXCEPTION_FILTER) private readonly httpExceptionFilter: ExceptionFilter,
    @inject(COMPONENT.VALIDATION_EXCEPTION_FILTER) private readonly validationExceptionFilter: ExceptionFilter,
  ) {
    this.server = express();
  }

  async init() {
    this.logger.info('Application initialization...');

    this.logger.info('Database initialization...');
    await this.initDb();
    this.logger.info('Database initialization has completed');

    this.logger.info('Middleware initialization...');
    await this.initMiddleware();
    this.logger.info('Middleware initialization has completed');

    this.logger.info('Controllers initialization...');
    await this.initControllers();
    this.logger.info('Controllers initialization has completed');

    this.logger.info('Exception filters initialization...');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialization has completed');

    this.logger.info('Server initialization...');
    await this.initServer();
    this.logger.info(`Server started on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }

  private async initDb() {
    const mongoURI = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoURI);
  }

  private async initServer() {
    this.server.listen(this.config.get('PORT'));
  }

  private async initControllers() {
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
  }

  private async initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(STATIC_UPLOAD_ROUTE, express.static(this.config.get('UPLOAD_DIRECTORY')));
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.server.use(cors());
  }

  private async initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
  }
}
