export type RentalType = 'apartment' | 'house' | 'room' | 'hotel';

export type Rental = {
  name: string;
  description: string;
  date: string;
  location: string;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  isFavourite: boolean;
  rating: string;
  type: RentalType;
  numberOfRooms: number;
  numberOfGuests: number;
  price: string;
  commodities: string[];
  author: string;
  numberOfComments: number;
  coordinates: {
    latitude: string;
    longitude: string;
  };
};
