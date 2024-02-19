import { User } from './user.type.js';

export type OfferType = 'apartment' | 'house' | 'room' | 'hotel';

export type Offer = {
  name: string;
  description: string;
  date: Date;
  location: string;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  isFavourite: boolean;
  rating: string;
  type: OfferType;
  numberOfRooms: number;
  numberOfGuests: number;
  price: string;
  commodities: string[];
  user: User;
  numberOfComments: number;
  coordinates: {
    latitude: string;
    longitude: string;
  };
};
