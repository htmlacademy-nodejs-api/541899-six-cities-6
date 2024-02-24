import { User } from './user.type.js';

export type OfferType = 'apartment' | 'house' | 'room' | 'hotel';

export type Commodity = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export type Location = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

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
