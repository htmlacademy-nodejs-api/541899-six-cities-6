import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { UserDto } from './dto/user.dto.js';

export interface UserService {
  create(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findById(id: string): Promise<DocumentType<UserEntity> | null>;
  updateById(userId: string, dto: UserDto): Promise<DocumentType<UserEntity> | null>;
  addOfferToFavourites(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null>;
  removeOfferFromFavourites(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null>;
}
