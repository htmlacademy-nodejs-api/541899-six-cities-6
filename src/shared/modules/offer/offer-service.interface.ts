import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { SortOrder } from 'mongoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentExists } from '../../models/document-exists.interface.js';

export interface OfferService extends DocumentExists {
  createOffer(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findOfferById(userId: string | undefined, offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getAllOffers(userId?: string, limit?: number, sortOrder?: { [key: string]: SortOrder }): Promise<DocumentType<OfferEntity>[]>
  updateOffer(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getPremiumOffersByLocation(userId: string | undefined, location: string, limit?: number): Promise<DocumentType<OfferEntity>[]>;
  getAllFavoriteOffersByUser(userId: string): Promise<DocumentType<OfferEntity>[]>;
  toggleFavorites(userId: string, offerId: string, isFavorite: boolean): Promise<boolean>;
  getPremiumOffersByLocation(userId: string | undefined, location: string, limit?: number): Promise<DocumentType<OfferEntity>[]>;
  exists(documentId: string): Promise<boolean>;
}
