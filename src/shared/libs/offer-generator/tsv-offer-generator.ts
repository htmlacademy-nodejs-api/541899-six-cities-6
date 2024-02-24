import { OfferGenerator } from '../../interfaces/offer-generator.interface.js';
import { generateRandomValue, getRandomBoolean, getRandomItem } from '../../helpers/support-functions.js';
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

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerDataType) {
  }

  generate(): string {
    const name = getRandomItem(this.mockData.names);
    const description = getRandomItem(this.mockData.descriptions);
    const location = getRandomItem(this.mockData.locations);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const photos = getRandomItem(this.mockData.photos);
    const isPremium = getRandomBoolean();
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
    const coordinates = getRandomItem(this.mockData.coordinates);

    return [name, description, location, previewImage, photos, isPremium, rating, type, numberOfRooms, numberOfGuests, price, commodities, userName, userEmail, userAvatar, userType, coordinates].join('\t');
  }
}
