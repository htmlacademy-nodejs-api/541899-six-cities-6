import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferDto, OfferEntity, OfferService } from './index.js';
import { SortOrder } from '../../models/sort-type.enum.js';
import { DEFAULT_OFFER_PREMIUM_COUNT } from '../../constants/offer.constants.js';
import mongoose from 'mongoose';
import { UserEntity } from '../user/user.entity.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {
  }

  private userLookupPipeline = [
    {
      $lookup: {
        from: 'users',
        localField: 'authorId',
        foreignField: '_id',
        as: 'author'
      }
    }
  ];

  private commentLookupPipeline = [
    {
      $lookup: {
        from: 'comments',
        localField: 'authorId',
        foreignField: 'authorId',
        as: 'comments'
      }
    }, {
      $addFields: {
        totalComments: {
          $size: '$comments'
        },
        averageRating: {
          $avg: '$comments.rating'
        }
      }
    }, {
      $unset: 'comments'
    }
  ];

  async createOffer(dto: OfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer has been created: ${dto.name}`);

    return result;
  }

  async findOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $toObjectId: '$_id' }, { $toObjectId: offerId }]
          }
        }
      },
      ...this.userLookupPipeline,
      ...this.commentLookupPipeline,
    ])
      .exec()
      .then((res) => res?.length || res.length === 0 ? null : res[0]);
  }

  async getAllOffers(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        ...this.userLookupPipeline,
        ...this.commentLookupPipeline,
      ]).exec();
  }

  updateOffer(offerId: string, dto: OfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, {new: true}).exec();
  }

  async deleteOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  async getAllFavoriteOffersByUser(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return await this.userModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) }
      },
      {
        $project: {
          _id: 1,
          favorites: {
            $map: {
              input: '$favorites',
              as: 'fav',
              in: {
                $toObjectId: '$$fav'
              }
            }
          }
        }
      }, {
        $lookup: {
          from: 'offers',
          localField: 'favorites',
          foreignField: '_id',
          as: 'favoriteOffers'
        }
      }, {
        $unwind: {
          path: '$favoriteOffers'
        }
      }, {
        $unset: [
          'favorites', '_id'
        ]
      }
    ]).exec();
  }

  async getPremiumOffersByLocation(city: string, limit = DEFAULT_OFFER_PREMIUM_COUNT): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel.aggregate([
      {
        $match: {
          premium: true,
          city
        }
      },
      ...this.commentLookupPipeline,
      { $limit: limit },
      { $sort: { publicationDate: SortOrder.Desc } }
    ]).exec();
  }

  async addOfferToFavorite(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null> {
    try {
      return await this.userModel.findByIdAndUpdate(
        userId,
        { $push: { favorites: offerId } },
        { new: true }
      );
    } catch (error) {
      this.logger.info('Error while adding offer to favorites');
      return null;
    }
  }

  async isExist(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId})) !== null;
  }

  async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, {
      '$inc': {
        commentCount: 1,
      }
    }).exec();
  }
}
