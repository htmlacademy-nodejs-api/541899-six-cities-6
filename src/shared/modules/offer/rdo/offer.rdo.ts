import { Expose, Type } from 'class-transformer';
import { Commodity, OfferType } from '../../../types/offer.type.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
    id: string;

  @Expose()
    name: string;

  @Expose()
    description: string;

  @Expose()
    date: string;

  @Expose()
    location: string;

  @Expose()
    previewImage: string;

  @Expose()
    photos: string[];

  @Expose()
    isPremium: boolean;

  @Expose()
    isFavorite: boolean;

  @Expose()
    rating: number;

  @Expose()
    offerType: OfferType;

  @Expose()
    numberOfRooms: number;

  @Expose()
    numberOfGuests: number;

  @Expose()
    price: number;

  @Expose()
    commodities: Commodity[];

  @Expose({ name: 'user'})
  @Type(() => UserRdo)
    user: UserRdo;

  @Expose()
    numberOfComments: number;

  @Expose()
    coordinates: {
    latitude: string,
    gratitude: string
  };
}
