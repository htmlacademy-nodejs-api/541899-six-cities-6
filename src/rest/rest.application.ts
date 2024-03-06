import { Logger } from '../shared/interfaces/logger.interface.js';
import { Config } from '../shared/interfaces/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/types/component.enum.js';
import { DatabaseClient } from '../shared/interfaces/database-client.interface.js';
import { getMongoURI } from '../shared/helpers/database.js';
import express, { Express } from 'express';
import { Controller, ParseTokenMiddleware } from '../shared/libs/rest/index.js';
import { ExceptionFilter } from '../shared/libs/rest/index.js';
import cors from 'cors';
import { STATIC_UPLOAD_ROUTE } from './rest.contstant.js';
import { getFullServerPath } from '../shared/helpers/support-functions.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter,
    @inject(Component.HttpExceptionFilter) private readonly httpExceptionFilter: ExceptionFilter,
    @inject(Component.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilter,
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
