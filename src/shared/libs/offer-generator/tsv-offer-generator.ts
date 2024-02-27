import { OfferGenerator } from '../../interfaces/offer-generator.interface.js';
import {
  generateRandomValue,
  getRandomBoolean,
  getRandomDate,
  getRandomItem,
} from '../../helpers/support-functions.js';
import {
  HIGHEST_RATING,
  LOWEST_RATING,
  MAX_GUESTS_QUANTITY,
  MAX_PRICE,
  MAX_ROOM_QUANTITY,
  MIN_GUESTS_QUANTITY,
  MIN_PRICE,
  MIN_ROOM_QUANTITY,
} from '../../constants/offer.constants.js';
import { MockServerDataType } from '../../types/mock-server-data.type.js';

const FIRST_MONTH_INDEX = 0;
const LAST_MONTH_INDEX = 11;
const FIRST_DAY_INDEX = 0;
const LAST_DAY_INDEX = 30;

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerDataType) {}

  generate(): string {
    const name = getRandomItem(this.mockData.names);
    const description = getRandomItem(this.mockData.descriptions);
    const date = getRandomDate(
      new Date(
        2024,
        generateRandomValue(FIRST_MONTH_INDEX, LAST_MONTH_INDEX),
        generateRandomValue(FIRST_DAY_INDEX, LAST_DAY_INDEX)
      ),
      new Date()
    );
    const location = getRandomItem(this.mockData.locations);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const photos = getRandomItem(this.mockData.photos);
    const isPremium = getRandomBoolean();
    const offerType = getRandomItem(this.mockData.offerTypes);
    const rating = generateRandomValue(LOWEST_RATING, HIGHEST_RATING);
    const numberOfRooms = generateRandomValue(MIN_ROOM_QUANTITY, MAX_ROOM_QUANTITY);
    const numberOfGuests = generateRandomValue(MIN_GUESTS_QUANTITY, MAX_GUESTS_QUANTITY);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const commodities = getRandomItem(this.mockData.commodities);
    const userName = getRandomItem(this.mockData.names);
    const userEmail = getRandomItem(this.mockData.emails);
    const userAvatar = getRandomItem(this.mockData.avatars);
    const userType = getRandomItem(this.mockData.userTypes);
    const coordinates = getRandomItem(this.mockData.coordinates);

    return [name, description, date, location, previewImage, photos, isPremium, offerType, rating, numberOfRooms, numberOfGuests, price, commodities, userName, userEmail, userAvatar, userType, coordinates].join('\t');
  }
}
