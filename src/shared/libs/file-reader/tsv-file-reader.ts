import { FileReader } from '../../../cli/interfaces/file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Rental, RentalType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly fileName: string
  ) {
  }

  read() {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf-8' });
  }

  formateToRentals(): Rental[] {
    if (!this.rawData) {
      throw new Error('File hasn\'t been read');
    }

    return this.rawData.split('\n')
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
}
