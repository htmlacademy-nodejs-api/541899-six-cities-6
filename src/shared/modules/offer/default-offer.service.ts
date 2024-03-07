import { inject, injectable } from 'inversify';
import { COMPONENT } from '../../types/component.enum.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UpdateOfferDto, OfferEntity, OfferService } from './index.js';
import { SortOrder } from '../../models/sort-type.enum.js';
import { OFFER } from '../../constants/offer.constants.js';
import { UserEntity } from '../user/user.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../libs/rest/errors/http.error.js';
import { Types } from 'mongoose';

const DEFAULT_PIPELINE = [
  {
    $project: {
      _id: 0,
      id: { $toString: '$_id' },
      name: 1,
      location: 1,
      rating: { $ifNull: [{ $avg: '$comments.rating' }, 0] },
      type: 1,
      favorites: { $in: ['$_id', { $ifNull: ['$user.favorites', []] }] },
      numberOfComments: { $size: '$comments' },
      previewImage: 1,
      date: 1,
      isPremium: 1,
      price: 1,
      title: 1,
      description: 1,
      photos: 1,
      commodities: 1,
      numberOfRooms: 1,
      numberOfGuests: 1,
    },
  },
];

const COMMENTS_PIPELINE = [
  {
    $lookup: {
      from: 'comments',
      let: { offerId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$$offerId', '$offerId'] } } },
        { $project: { _id: 0, rating: 1 } },
      ],
      as: 'comments',
    },
  },
];

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT.OFFER_MODEL) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(COMPONENT.USER_MODEL) private readonly userModel: types.ModelType<UserEntity>,
  ) {
  }

  async createOffer(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer has been created: ${dto.name}`);

    return result;
  }

  async updateOffer(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, { new: true }).exec();
  }

  async deleteOfferById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  async getAllOffers(
    limit = OFFER.MAX_QUANTITY,
    sortOrder = SortOrder.Desc
  ): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel
      .aggregate([
        ...COMMENTS_PIPELINE,
        {
          $project: {
            _id: 1,
            name: 1,
            location: 1,
            rating: { $ifNull: [{ $avg: '$comments.rating' }, 0] },
            type: 1,
            favorites: { $in: ['$_id', { $ifNull: ['$user.favorites', []] }] },
            numberOfComments: { $size: '$comments' },
            previewImage: 1,
            date: 1,
            isPremium: 1,
            price: 1,
          },
        },
        { $limit: limit },
        { $sort: { publicationDate: sortOrder } }
      ])
      .exec();

    return this.offerModel.populate(offers, { path: 'userId' });
  }

  async findOfferById(
    userId: string | undefined,
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.aggregate([
      ...COMMENTS_PIPELINE,
      {
        $match: {
          $expr: {
            $eq: [{ $toObjectId: '$_id' }, { $toObjectId: offerId }]
          }
        }
      },
      ...this.getUserPipeline(userId),
      ...DEFAULT_PIPELINE
    ])
      .exec()
      .then((result) => {
        if (result.length === 0) {
          return null;
        }
        return result[0];
      });
  }

  async getPremiumOffersByLocation(
    userId: string | undefined,
    location: string,
  ): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel.aggregate([
      {
        $match: { location, isPremium: true },
      },
      ...COMMENTS_PIPELINE,
      ...this.getUserPipeline(userId),
      ...DEFAULT_PIPELINE
    ]).exec();
  }

  async getAllFavoriteOffersByUser(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const user = await this.userModel.findById(userId);

    return this.offerModel.aggregate([
      {
        $match: {
          _id: { $in: user?.favorites }
        },
      },
      {
        $set: {
          favorites: true,
        },
      },
      {
        $sort: { createdAt: SortOrder.Desc }
      },
    ])
      .exec();
  }

  async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId})) !== null;
  }

  async toggleFavorites(userId: string, offerId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, `User with id ${userId} not found.`, 'DefaultOfferService');
    }

    const offerObjectId = new Types.ObjectId(offerId);

    if (user.favorites.includes(offerObjectId)) {
      user.favorites.pull(offerObjectId);
      await user.save();
      return false;
    } else {
      user.favorites.push(offerObjectId);
      await user.save();
      return true;
    }
  }

  async checkIsAuthor(
    userId: string,
    documentId: string
  ): Promise<boolean> {
    const offer = await this.offerModel.findById(documentId);
    return offer?.userId.toString() === userId;
  }

  private getUserPipeline(userId: string | undefined) {
    return [
      {
        $lookup: {
          from: 'users',
          let: { id: { $toObjectId: userId } },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
          ],
          as: 'users',
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$users', 0] },
        },
      },
      {
        $unset: ['users'],
      },
    ];
  }
}
