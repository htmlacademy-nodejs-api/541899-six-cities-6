import { OfferGenerator } from '../../interfaces/offer-generator.interface.js';
import {
  generateRandomValue,
  getRandomBoolean,
  getRandomDate,
  getRandomItem,
} from '../../helpers/support-functions.js';
import {
  RATING,
  ROOM,
  GUEST,
  PRICE,
} from '../../constants/offer.constants.js';
import { MockServerDataType } from '../../types/mock-server-data.type.js';

enum CALENDAR {
  FIRST_MONTH_INDEX = 0,
  LAST_MONTH_INDEX = 11,
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  FIRST_DAY_INDEX = 0,
  LAST_DAY_INDEX = 30,
  YEAR = 2024,
}

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerDataType) {}

  generate(): string {
    const name = getRandomItem(this.mockData.names);
    const description = getRandomItem(this.mockData.descriptions);
    const date = getRandomDate(
      new Date(
        CALENDAR.YEAR,
        generateRandomValue(CALENDAR.FIRST_MONTH_INDEX, CALENDAR.LAST_MONTH_INDEX),
        generateRandomValue(CALENDAR.FIRST_DAY_INDEX, CALENDAR.LAST_DAY_INDEX)
      ),
      new Date()
    );
    const location = getRandomItem(this.mockData.locations);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const photos = getRandomItem(this.mockData.photos);
    const isPremium = getRandomBoolean();
    const offerType = getRandomItem(this.mockData.offerTypes);
    const rating = generateRandomValue(RATING.LOWEST, RATING.HIGHEST);
    const numberOfRooms = generateRandomValue(ROOM.MIN_QUANTITY, ROOM.MAX_QUANTITY);
    const numberOfGuests = generateRandomValue(GUEST.MIN_QUANTITY, GUEST.MAX_QUANTITY);
    const price = generateRandomValue(PRICE.LOWEST, PRICE.HIGHEST);
    const commodities = getRandomItem(this.mockData.commodities);
    const userName = getRandomItem(this.mockData.names);
    const userEmail = getRandomItem(this.mockData.emails);
    const userAvatar = getRandomItem(this.mockData.avatars);
    const type = getRandomItem(this.mockData.userTypes);
    const coordinates = getRandomItem(this.mockData.coordinates);

    return [name, description, date, location, previewImage, photos, isPremium, offerType, rating, numberOfRooms, numberOfGuests, price, commodities, userName, userEmail, userAvatar, type, coordinates].join('\t');
  }
}
