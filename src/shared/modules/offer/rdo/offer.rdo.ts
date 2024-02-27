import { Expose, Type } from 'class-transformer';
import { Commodity, OfferType } from '../../../types/offer.type.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public name: string;

  @Expose()
  public description: string;

  @Expose()
  public date: string;

  @Expose()
  public location: string;

  @Expose()
  public previewImage: string;

  @Expose()
  public photos: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public offerType: OfferType;

  @Expose()
  public numberOfRooms: number;

  @Expose()
  public numberOfGuests: number;

  @Expose()
  public price: number;

  @Expose()
  public commodities: Commodity[];

  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  public numberOfComments: number;

  @Expose()
  public coordinates: {
    latitude: string,
    gratitude: string
  };
}
