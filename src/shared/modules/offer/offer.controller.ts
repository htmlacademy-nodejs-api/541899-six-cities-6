import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Request, Response } from 'express';
import {
  HttpMethod,
  BaseController,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
  DocumentExistsMiddleware,
  PrivateRouteMiddleware, RequestBody,
} from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { fillDTO } from '../../helpers/support-functions.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { UpdateOfferRequest } from './update-offer-request.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { MAX_PREMIUM_OFFERS_QUANTITY } from '../../constants/offer.constants.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { FavoriteOfferDto } from './dto/favorite-offer.dto.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { CommentRdo, CommentService, CreateCommentDto } from '../comment/index.js';
import { CreateCommentRequest } from '../comment/types/create-comment-request.type.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
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
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
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
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
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
      handler: this.getFavoriteOffers,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/:offerId/comments/',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('id'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'id'),
      ],
    });
    this.addRoute({
      path: '/:offerId/comments/',
      method: HttpMethod.Post,
      handler: this.createComment,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ],
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Put,
      handler: this.toggleFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(FavoriteOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  async index({ query, tokenPayload }: Request, res: Response): Promise<void> {
    const limit = Number.parseInt(query.limit as string, 10);
    const offers = await this.offerService.getAllOffers(tokenPayload?.id, limit);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.createOffer({ ...body, userId: tokenPayload.id });
    this.created(res, fillDTO(OfferRdo, offer));
  }

  async show({ params: { offerId }, tokenPayload }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.findOfferById(tokenPayload?.id, offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  async update(
    { params, body, tokenPayload }: UpdateOfferRequest,
    res: Response): Promise<void> {
    await this.offerService.updateOffer(params.offerId, body);
    const updatedOffer = await this.offerService.findOfferById(tokenPayload.id, params.offerId);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  async delete({ params }: Request, res: Response): Promise<void> {
    const { offerId } = params;
    await this.offerService.deleteOfferById(offerId);
    await this.commentService.deleteCommentByOfferId(offerId);
    this.noContent(res, null);
  }

  async getPremiumOffers({ query, tokenPayload }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getPremiumOffersByLocation(
      tokenPayload?.id,
      query.location as string,
      MAX_PREMIUM_OFFERS_QUANTITY
    );
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async getFavoriteOffers({ tokenPayload: { id } }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getAllFavoriteOffersByUser(id);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  async toggleFavorites(
    { params, tokenPayload, body }: Request<ParamOfferId, RequestBody, { isFavorite: boolean }>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const userId = tokenPayload.id;

    const offer = await this.offerService.toggleFavorites(userId, offerId, body.isFavorite);

    this.ok(res, {
      isFavorite: offer,
    });
  }

  async getComments(
    { params }: Request<ParamOfferId>,res: Response): Promise<void> {
    const comments = await this.commentService.findCommentsByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  async createComment({ body, tokenPayload }: CreateCommentRequest, res: Response): Promise<void> {
    if (!(await this.offerService.exists(body.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} was not found.`
      );
    }

    const comment = await this.commentService.createComment({ ...body, userId: tokenPayload.id });

    this.created(res, fillDTO(CommentRdo, comment));
  }
}
