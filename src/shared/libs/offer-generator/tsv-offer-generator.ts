import { OfferGenerator } from '../../interfaces/offer-generator.interface.js';
import { generateRandomValue, getRandomBoolean, getRandomItem } from '../../helpers/support-functions.js';
import { MockServerDataType } from '../../types/index.js';
import dayjs from 'dayjs';

const FIRST_DAY_OF_THE_WEEK = 1;
const LAST_DAY_OF_THE_WEEK = 7;
const LOWEST_RATING = 0;
const HIGHEST_RATING = 5;
const MIN_ROOM_QUANTITY = 1;
const MAX_ROOM_QUANTITY = 20;
const MIN_GUESTS_QUANTITY = 1;
const MAX_GUESTS_QUANTITY = 20;
const MIN_PRICE = 1;
const MAX_PRICE = 1000000;
const MIN_COMMENTS_QUANTITY = 0;
const MAX_COMMENTS_QUANTITY = 1000000;

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerDataType) {
  }

  generate(): string {
    const name = getRandomItem(this.mockData.names);
    const description = getRandomItem(this.mockData.descriptions);
    const date = dayjs()
      .subtract(generateRandomValue(FIRST_DAY_OF_THE_WEEK, LAST_DAY_OF_THE_WEEK), 'day')
      .toISOString();
    const location = getRandomItem(this.mockData.locations);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const photos = getRandomItem(this.mockData.photos);
    const isPremium = getRandomBoolean();
    const isFavourite = getRandomBoolean();
    const rating = generateRandomValue(LOWEST_RATING, HIGHEST_RATING);
    const type = getRandomItem(this.mockData.types);
    const numberOfRooms = generateRandomValue(MIN_ROOM_QUANTITY, MAX_ROOM_QUANTITY);
    const numberOfGuests = generateRandomValue(MIN_GUESTS_QUANTITY, MAX_GUESTS_QUANTITY);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const commodities = getRandomItem(this.mockData.commodities);
    const author = getRandomItem(this.mockData.names);
    const numberOfComments = generateRandomValue(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY);
    const coordinates = getRandomItem(this.mockData.coordinates);

    return [name, description, date, location, previewImage, photos, isPremium, isFavourite, rating, type, numberOfRooms, numberOfGuests, price, commodities, author, numberOfComments, coordinates].join('\t');
  }
}
