import { Commodity, Location, OfferType } from '../../../types/offer.type.js';

export class OfferDto {
  name: string;
  description: string;
  date: string;
  location: Location;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  isFavorite?: boolean;
  rating: number;
  type: OfferType;
  numberOfRooms: number;
  numberOfGuests: number;
  price: string;
  commodities: Commodity[];
  userId: string;
  numberOfComments: number;
  coordinates: {
    latitude: string;
    longitude: string;
  };
}
