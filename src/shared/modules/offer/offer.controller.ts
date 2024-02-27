import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Request, Response } from 'express';
import { HttpMethod, BaseController } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { fillDTO } from '../../helpers/support-functions.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { UpdateOfferRequest } from './update-offer-request.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
  }

  async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getAllOffers();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.createOffer(body);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  async update({ body, params }: UpdateOfferRequest, res: Response): Promise<void> {
    const offerId = params?.offerId as string;

    if (!offerId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Offer ID should be a valid string', 'OfferController');
    }

    const existingOffer = await this.offerService.findOfferById(offerId);

    if (!existingOffer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${offerId} does not exist`, 'OfferController');
    }
    const offer = await this.offerService.updateOffer(offerId, body);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  async delete({ params }: Request, res: Response): Promise<void> {
    const offerId = params?.offerId;

    if (!offerId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Offer ID should be a valid string', 'OfferController');
    }

    const existingOffer = await this.offerService.findOfferById(offerId);

    if (!existingOffer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with ID ${offerId} does not exist`, 'OfferController');
    }

    await this.offerService.deleteOfferById(offerId);
    this.noContent(res, null);
  }
}
