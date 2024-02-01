import { Rental, RentalType } from '../types/index.js';

export function formateToRentals(rawData: string): Rental[] {
  if (!rawData) {
    throw new Error('File hasn\'t been read');
  }

  return rawData.split('\n')
    .filter((row) => row.trim().length > 0)
    .map((line) => line.split('\t'))
    .map((
      [
        name, description, date, location, previewImage, photos, isPremium, isFavourite, rating, type, numberOfRooms, numberOfGuests, price, commodities, author, numberOfComments, coordinates]) => ({
      name,
      description,
      date,
      location,
      previewImage,
      photos: photos.split(' '),
      isPremium: !!isPremium,
      isFavourite: !!isFavourite,
      rating,
      type: type as RentalType,
      numberOfRooms: +numberOfRooms,
      numberOfGuests: +numberOfGuests,
      price,
      commodities: commodities.split(' '),
      author,
      numberOfComments: +numberOfComments,
      coordinates: {
        latitude: coordinates.split(' ')[0],
        longitude: coordinates.split(' ')[1],
      }
    }));
}
