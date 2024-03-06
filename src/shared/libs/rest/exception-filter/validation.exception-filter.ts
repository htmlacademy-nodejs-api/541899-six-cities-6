import { inject, injectable } from 'inversify';
import { ExceptionFilter } from '../index.js';
import { Logger } from '../../../interfaces/logger.interface.js';
import { COMPONENT } from '../../../types/component.enum.js';
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors/validation.error.js';
import { StatusCodes } from 'http-status-codes';
import { createErrorObject } from '../../../helpers/support-functions.js';
import { ApplicationError } from '../types/application-error.enum.js';

@injectable()
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger
  ) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error.message}`, error);

    error.details.forEach(
      (errorField) => this.logger.warn(`[${errorField.property}] — ${errorField.messages}`)
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.ValidationError, error.message, error.details));
  }
}
