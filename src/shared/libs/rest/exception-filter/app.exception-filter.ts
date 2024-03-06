import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { COMPONENT } from '../../../types/component.enum.js';
import { Logger } from '../../../interfaces/logger.interface.js';
import { createErrorObject } from '../../../helpers/support-functions.js';
import { ExceptionFilter } from './exception-filter.interface.js';
import { ApplicationError } from '../types/application-error.enum.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger
  ) {
    this.logger.info('Register AppExceptionFilter');
  }

  catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ApplicationError.ServiceError, error.message));
  }
}
