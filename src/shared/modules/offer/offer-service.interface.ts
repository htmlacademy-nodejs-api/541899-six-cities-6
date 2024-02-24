import { OfferDto } from './dto/offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { SortOrder } from 'mongoose';
import { UserEntity } from '../user/user.entity.js';

export interface OfferService {
  createOffer(dto: OfferDto): Promise<DocumentType<OfferEntity>>;
  findOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getAllOffers(limit: number, sortOrder?: { [key: string]: SortOrder }): Promise<DocumentType<OfferEntity>[]>
  updateOffer(offerId: string, dto: OfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getPremiumOffersByLocation(city: string, limit?: number): Promise<DocumentType<OfferEntity>[]>;
  getAllFavoriteOffersByUser(userId: string): Promise<DocumentType<OfferEntity>[]>;
  addOfferToFavorite(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null>;
  isExist(documentId: string): Promise<boolean>;
}
