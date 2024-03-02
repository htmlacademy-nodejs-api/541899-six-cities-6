import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { SortOrder } from 'mongoose';
import { UserEntity } from '../user/user.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentExists } from '../../models/document-exists.interface.js';

export interface OfferService extends DocumentExists {
  createOffer(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getAllOffers(limit?: number, sortOrder?: { [key: string]: SortOrder }): Promise<DocumentType<OfferEntity>[]>
  updateOffer(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getPremiumOffersByLocation(city: string, limit?: number): Promise<DocumentType<OfferEntity>[]>;
  getAllFavoriteOffersByUser(userId: string): Promise<DocumentType<OfferEntity>[]>;
  addOfferToFavorite(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null>;
  getPremiumOffersByCity(city: string, limit?: number): Promise<DocumentType<OfferEntity>[]>;
  exists(documentId: string): Promise<boolean>;
}
