import { IsBoolean } from 'class-validator';
import { FavoriteOfferMessages } from '../index.js';

export class FavoriteOfferDto {
  @IsBoolean({ message: FavoriteOfferMessages.favorites.invalidFormat })
    favorites: boolean;
}
