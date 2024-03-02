import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Request, Response } from 'express';
import {
  HttpMethod,
  BaseController,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
  DocumentExistsMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { fillDTO } from '../../helpers/support-functions.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { UpdateOfferRequest } from './update-offer-request.type.js';
import { CommentRdo, CommentService, CreateCommentDto } from '../comment/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_PREMIUM_COUNT } from '../../constants/offer.constants.js';
import { CreateCommentRequest } from '../comment/types/create-comment-request.type.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);
    this.setRoutes();
  }

  private setRoutes() {
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update, middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Post,
      handler: this.createComment,
      middlewares: [
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremiumOffers
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavoritesOffers
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Put,
      handler: this.favorite,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
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
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'offerId must be a valid string',
        'OfferController'
      );
    }

    const existingOffer = await this.offerService.findOfferById(offerId);

    if (!existingOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} does not exist`,
        'OfferController'
      );
    }
    const offer = await this.offerService.updateOffer(offerId, body);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  async delete({ params }: Request, res: Response): Promise<void> {
    const offerId = params?.offerId;

    if (!offerId) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Offer ID should be a valid string',
        'OfferController'
      );
    }

    const existingOffer = await this.offerService.findOfferById(offerId);

    if (!existingOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with ID ${offerId} does not exist`,
        'OfferController'
      );
    }

    await this.offerService.deleteOfferById(offerId);
    this.noContent(res, null);
  }

  async getComments({ params }: Request<ParamOfferId>, _res: Response): Promise<void> {
    if (!await this.offerService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }
  }

  async createComment(
    { body }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    this.created(res, fillDTO(CommentRdo, await this.commentService.createComment(body)));
  }

  async getPremiumOffers({ query }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getPremiumOffersByCity(query.city as string, DEFAULT_OFFER_PREMIUM_COUNT);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async getFavoritesOffers(): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  favorite(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }
}
