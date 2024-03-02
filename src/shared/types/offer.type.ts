import { User } from './user.type.js';

export enum OfferTypeEnum {
  apartment,
  house,
  room,
  hotel
}

export type OfferType = keyof OfferTypeEnum;

export enum CommodityEnum {
  Breakfast,
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge'
}

export type Commodity = keyof CommodityEnum;

export enum LocationEnum {
  Paris,
  Cologne,
  Brussels,
  Amsterdam,
  Hamburg,
  Dusseldorf,
}

export type Location = keyof LocationEnum;

export type Coordinates = {
  longitude: string,
  latitude: string,
}

export type Offer = {
  name: string;
  description: string;
  date: Date;
  location: Location;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  isFavorite?: boolean;
  rating?: number;
  type: OfferType;
  numberOfRooms: number;
  numberOfGuests: number;
  price: string;
  commodities: Commodity[];
  user: User;
  numberOfComments?: number;
  coordinates: {
    latitude: string;
    longitude: string;
  };
};
