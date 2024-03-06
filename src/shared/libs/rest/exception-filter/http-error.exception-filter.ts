import { inject, injectable } from 'inversify';
import { ExceptionFilter } from '../index.js';
import { COMPONENT } from '../../../types/component.enum.js';
import { Logger } from '../../../interfaces/logger.interface.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http.error.js';
import { StatusCodes } from 'http-status-codes';
import { createErrorObject } from '../../../helpers/support-functions.js';
import { ApplicationError } from '../types/application-error.enum.js';

@injectable()
export class HttpErrorExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`, error);

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.CommonError, error.message));
  }
}
