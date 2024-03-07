import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Request, Response } from 'express';
import {
  HttpMethod,
  BaseController,
  ValidateDtoMiddleware,
  PrivateRouteMiddleware, RequestBody, UploadFileMiddleware,
} from '../../libs/rest/index.js';
import { COMPONENT } from '../../types/component.enum.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { fillDTO } from '../../helpers/support-functions.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { UpdateOfferRequest } from './update-offer-request.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ALLOWED_IMAGE_TYPES, PHOTO } from '../../constants/offer.constants.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { FavoriteOfferDto } from './dto/favorite-offer.dto.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { CommentRdo, CommentService, CreateCommentDto } from '../comment/index.js';
import { CreateCommentRequest } from '../comment/types/create-comment-request.type.js';
import { HttpError } from '../../libs/rest/errors/http.error.js';
import { StatusCodes } from 'http-status-codes';
import { ValidateUserMiddleware } from '../../libs/rest/middleware/validate-user.middleware.js';
import { RestSchema } from '../../libs/config/rest.schema.js';
import { Config } from '../../interfaces/config.interface.js';
import { UploadImagesRdo } from '../user/rdo/upload-images.rdo.js';
import { SortOrder } from '../../models/sort-type.enum.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(COMPONENT.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT.OFFER_SERVICE) private readonly offerService: OfferService,
    @inject(COMPONENT.COMMENT_SERVICE) private readonly commentService: CommentService,
    @inject(COMPONENT.CONFIG) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);
    this.setRoutes();
  }

  private setRoutes() {
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.createOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.editOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new ValidateUserMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateUserMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getOffersList
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getFullOfferInfo,
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getOfferComments,
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Post,
      handler: this.addNewComment,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
      ],
    });
    this.addRoute({
      path: '/premium/:location',
      method: HttpMethod.Get,
      handler: this.getPremiumOffersList
    });
    this.addRoute({
      path: '/favorites/list',
      method: HttpMethod.Get,
      handler: this.getUserFavoriteOffers,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Put,
      handler: this.toggleFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(FavoriteOfferDto),
      ]
    });
    this.addRoute({
      path: '/:offerId/images',
      method: HttpMethod.Post,
      handler: this.uploadImages,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateUserMiddleware(this.offerService, 'Offer', 'offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image',
          ALLOWED_IMAGE_TYPES,
          PHOTO.QUANTITY
        )
      ]
    });
  }

  async getOffersList({ query }: Request, res: Response): Promise<void> {
    const limit = query?.limit ? Number.parseInt(query.limit as string, 10) : undefined;
    const sortOrder: SortOrder | undefined = query?.sortOrder ? Number(query.sortOrder) : undefined;
    const offers = await this.offerService.getAllOffers(limit, sortOrder);
    this.returnOkStatus(res, fillDTO(OfferRdo, offers));
  }

  async createOffer({ body, tokenPayload: { id } }: CreateOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.createOffer({ ...body, userId: id });
    this.returnCreatedStatus(res, fillDTO(OfferRdo, offer));
  }

  async getFullOfferInfo({ params: { offerId }, tokenPayload }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.findOfferById(tokenPayload?.id, offerId);
    this.returnOkStatus(res, fillDTO(OfferRdo, offer));
  }

  async editOffer(
    { params: { offerId }, body, tokenPayload: { id } }: UpdateOfferRequest,
    res: Response): Promise<void> {
    await this.offerService.updateOffer(offerId, body);
    const updatedOffer = await this.offerService.findOfferById(id, offerId);

    this.returnOkStatus(res, fillDTO(OfferRdo, updatedOffer));
  }

  async deleteOffer({ params: { offerId } }: Request, res: Response): Promise<void> {
    await this.offerService.deleteOfferById(offerId);
    await this.commentService.deleteCommentByOfferId(offerId);
    this.returnNoContentStatus(res, null);
  }

  async getPremiumOffersList({ params: { location }, tokenPayload }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getPremiumOffersByLocation(
      tokenPayload?.id || undefined,
      location,
    );
    this.returnOkStatus(res, fillDTO(OfferRdo, offers));
  }

  async getUserFavoriteOffers({ tokenPayload }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getAllFavoriteOffersByUser(tokenPayload.id);
    this.returnOkStatus(res, fillDTO(OfferRdo, offers));
  }

  async toggleFavorites(
    { params: { offerId }, tokenPayload: { id }, body }: Request<ParamOfferId, RequestBody, { isFavorite: boolean }>,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.toggleFavorites(id, offerId, body?.isFavorite || false);

    this.returnOkStatus(res, fillDTO(OfferRdo, offer));
  }

  async getOfferComments(
    { params: { offerId } }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findCommentsByOfferId(offerId);
    this.returnOkStatus(res, fillDTO(CommentRdo, comments));
  }

  async addNewComment(
    { params: { offerId }, tokenPayload: { id }, body }: CreateCommentRequest,
    res: Response
  ): Promise<void> {
    if (!(await this.offerService.exists(offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} was not found.`
      );
    }

    const comment = await this.commentService.createComment({
      text: body.text,
      rating: body.rating,
      userId: id,
      offerId,
    });

    this.returnCreatedStatus(res, fillDTO(CommentRdo, comment));
  }

  async uploadImages({ params: { offerId }, files }: Request<ParamOfferId>, res: Response) {
    if (!Array.isArray(files)) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'No files uploaded');
    }
    const updateDto = {
      photos: files?.map((file) => file.filename) ?? []
    };
    await this.offerService.updateOffer(offerId, updateDto);
    this.returnCreatedStatus(res, fillDTO(UploadImagesRdo, updateDto));
  }
}
