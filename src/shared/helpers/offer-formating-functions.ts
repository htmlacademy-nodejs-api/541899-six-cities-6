import { Offer, OfferType, UserType } from '../types/index.js';

export function getOfferFromString(rawData: string): Offer {
  const [
    name,
    description,
    date,
    location,
    previewImage,
    photos,
    isPremium,
    isFavourite,
    rating,
    type,
    numberOfRooms,
    numberOfGuests,
    price,
    commodities,
    user,
    userEmail,
    userAvatar,
    userType,
    numberOfComments,
    coordinates,
  ] = rawData.replace('\n', '').split('\t');

  return {
    name,
    description,
    date: new Date(date),
    location,
    previewImage,
    photos: photos.split(','),
    isPremium: !!isPremium,
    isFavourite: !!isFavourite,
    rating,
    type: type as OfferType,
    numberOfRooms: +numberOfRooms,
    numberOfGuests: +numberOfGuests,
    price,
    commodities: commodities.split(','),
    user: {
      name: user,
      email: userEmail,
      avatar: userAvatar,
      userType: userType as UserType,
    },
    numberOfComments: +numberOfComments,
    coordinates: {
      latitude: coordinates.split(' ')[0],
      longitude: coordinates.split(' ')[1],
    },
  };
}
