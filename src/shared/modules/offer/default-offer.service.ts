import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UpdateOfferDto, OfferEntity, OfferService } from './index.js';
import { SortOrder } from '../../models/sort-type.enum.js';
import { MAX_OFFERS_QUANTITY, MAX_PREMIUM_OFFERS_QUANTITY } from '../../constants/offer.constants.js';
import mongoose, { Types } from 'mongoose';
import { UserEntity } from '../user/user.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { authorPipeline, commentsPipeline, defaultPipeline, getPipeline } from './offer.aggregation.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {
  }

  async createOffer(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer has been created: ${dto.name}`);

    return result;
  }

  async findOfferById(
    userId: string | undefined,
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $toObjectId: '$_id' }, { $toObjectId: offerId }]
          }
        }
      },
      ...getPipeline(userId),
    ])
      .exec()
      .then((result) => {
        if (result.length === 0) {
          return null;
        }
        return result[0];
      });
  }

  async getAllOffers(
    userId: string | undefined,
    limit = MAX_OFFERS_QUANTITY,
    sortOrder: { [key: string]: SortOrder } = { publicationDate: SortOrder.Desc }
  ): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        ...getPipeline(userId),
        { $limit: limit },
        { $sort: sortOrder },
      ])
      .exec();
  }

  public updateOffer(
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

  async getPremiumOffersByLocation(
    userId: string | undefined,
    location: string,
    limit = MAX_PREMIUM_OFFERS_QUANTITY
  ): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel.aggregate([
      {
        $match: {
          premium: true,
          location
        }
      },
      ...getPipeline(userId),
      { $limit: limit },
      { $sort: { publicationDate: SortOrder.Desc } }
    ]).exec();
  }

  async getAllFavoriteOffersByUser(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.userModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) }
      },
      {
        $project: {
          _id: 0,
          favoriteOffers: {
            $map: {
              input: '$favorites',
              as: 'fav',
              in: {
                $toObjectId: '$$fav'
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'offers',
          localField: 'favoriteOffers',
          foreignField: '_id',
          as: 'favoriteOffers'
        }
      },
      {
        $unwind: {
          path: '$favoriteOffers'
        }
      },
      {
        $replaceRoot: { newRoot: '$favoriteOffers' }
      },
      ...commentsPipeline,
      ...authorPipeline,
      ...defaultPipeline,
    ]).exec();
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

    if (user.favoriteOffers.includes(offerObjectId)) {
      user.favoriteOffers.pull(offerObjectId);
      await user.save();
      return false;
    } else {
      user.favoriteOffers.push(offerObjectId);
      await user.save();
      return true;
    }
  }

  async isAuthor(
    userId: string,
    documentId: string
  ): Promise<boolean> {
    const offer = await this.offerModel.findById(documentId);
    return offer?.userId.toString() === userId;
  }
}
