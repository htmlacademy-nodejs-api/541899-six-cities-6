import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { NextFunction, Request, Response } from 'express';
import { BaseUserException } from './errors/index.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register AuthExceptionFilter');
  }

  catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);

    res.status(error.httpStatusCode).json({
      type: 'AUTHORIZATION',
      error: error.message,
    });
  }
}
