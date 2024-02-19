import { OfferGenerator } from '../../interfaces/offer-generator.interface.js';
import { generateRandomValue, getRandomBoolean, getRandomItem } from '../../helpers/support-functions.js';
import { MockServerDataType } from '../../types/index.js';
import dayjs from 'dayjs';
import {
  FIRST_DAY_OF_THE_WEEK,
  HIGHEST_RATING,
  LAST_DAY_OF_THE_WEEK,
  LOWEST_RATING,
  MAX_COMMENTS_QUANTITY,
  MAX_GUESTS_QUANTITY,
  MAX_PRICE,
  MAX_ROOM_QUANTITY,
  MIN_COMMENTS_QUANTITY,
  MIN_GUESTS_QUANTITY,
  MIN_PRICE,
  MIN_ROOM_QUANTITY,
} from '../../constants/offer.constants.js';

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
    const userName = getRandomItem(this.mockData.names);
    const userEmail = getRandomItem(this.mockData.emails);
    const userAvatar = getRandomItem(this.mockData.avatars);
    const userType = getRandomItem(this.mockData.userTypes);
    const numberOfComments = generateRandomValue(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY);
    const coordinates = getRandomItem(this.mockData.coordinates);

    return [name, description, date, location, previewImage, photos, isPremium, isFavourite, rating, type, numberOfRooms, numberOfGuests, price, commodities, userName, userEmail, userAvatar, userType, numberOfComments, coordinates].join('\t');
  }
}
