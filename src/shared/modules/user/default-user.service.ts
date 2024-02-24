import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { UserEntity } from './user.entity.js';
import { UserDto } from './dto/user.dto.js';
import { UserService } from './user-service.interface.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {
  }

  async create(dto: UserDto, key: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, key);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById({id});
  }

  async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  async findOrCreate(dto: UserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  async updateById(userId: string, dto: UserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, dto, {new: true})
      .populate(['favorites'])
      .exec();
  }

  async addOfferToFavourites(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null> {
    try {
      return await this.userModel.findByIdAndUpdate(
        userId,
        { $push: { favorites: offerId } },
        { new: true }
      );
    } catch (error) {
      this.logger.info('Error adding offer to favorites');
      return null;
    }
  }

  async removeOfferFromFavourites(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null> {
    try {
      return await this.userModel.findByIdAndUpdate(
        userId,
        { $pull: { favorites: offerId } },
        { new: true }
      );
    } catch (error) {
      this.logger.info('Error removing offer from favorites:');
      return null;
    }
  }
}
