import { Middleware } from './middleware.interface.js';
import { OfferService } from '../../../modules/offer/index.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http.error.js';
import { StatusCodes } from 'http-status-codes';

export class ValidateUserMiddleware implements Middleware {
  constructor(
    private readonly offerService: OfferService,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {}

  async execute({ params, tokenPayload}: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];

    if (!(await this.offerService.checkIsAuthor(tokenPayload.id, documentId))) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `Action is forbidden for ${this.entityName}`,
        'ValidateAuthorMiddleware',
      );
    }

    next();
  }
}
