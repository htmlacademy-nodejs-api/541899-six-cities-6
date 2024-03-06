import { inject, injectable } from 'inversify';
import { COMPONENT } from '../../types/component.enum.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { NextFunction, Request, Response } from 'express';
import { BaseUserException } from './errors/index.js';
import { createErrorObject } from '../../helpers/support-functions.js';
import { ApplicationError } from '../../libs/rest/types/application-error.enum.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger
  ) {
    this.logger.info('Register AuthExceptionFilter');
  }

  catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);

    res.status(error.httpStatusCode)
      .json(
        createErrorObject(ApplicationError.AuthorizationError, error.message)
      );
  }
}
