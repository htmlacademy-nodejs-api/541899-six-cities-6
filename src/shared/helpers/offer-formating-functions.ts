import { Commodity, Location, Offer, OfferType } from '../types/offer.type.js';
import { UserType } from '../types/user.type.js';

export function getOfferFromString(rawData: string): Offer {
  const [
    name,
    description,
    date,
    location,
    previewImage,
    photos,
    isPremium,
    offerType,
    rating,
    numberOfRooms,
    numberOfGuests,
    price,
    commodities,
    userName,
    userEmail,
    userAvatar,
    userType,
    coordinates,
  ] = rawData.replace('\n', '').split('\t');

  return {
    name,
    description,
    date: new Date(date),
    location: location as Location,
    previewImage,
    photos: photos.split(','),
    isPremium: !!isPremium,
    type: offerType as OfferType,
    rating: +rating,
    numberOfRooms: +numberOfRooms,
    numberOfGuests: +numberOfGuests,
    price,
    commodities: commodities.split(',') as Commodity[],
    user: {
      name: userName,
      email: userEmail,
      avatar: userAvatar,
      userType: userType as UserType,
    },
    coordinates: {
      latitude: coordinates.split(' ')[0],
      longitude: coordinates.split(' ')[1],
    },
  };
}
