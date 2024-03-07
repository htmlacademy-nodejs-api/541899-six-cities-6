import { IsBoolean } from 'class-validator';
import { FAVORITE_OFFER_MESSAGES } from './favorite-offer.messages.js';

export class FavoriteOfferDto {
  @IsBoolean({ message: FAVORITE_OFFER_MESSAGES.FAVORITES.INVALID_FORMAT })
    isFavorite: boolean;
}
