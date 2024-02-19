import { OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public date: Date;
  public location: string;
  public previewImage: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavourite: boolean;
  public rating: string;
  public type: OfferType;
  public numberOfRooms: number;
  public numberOfGuests: number;
  public price: string;
  public commodities: string[];
  public userId: string;
  public numberOfComments: number;
  public coordinates: {
    latitude: string;
    longitude: string;
  };
}
