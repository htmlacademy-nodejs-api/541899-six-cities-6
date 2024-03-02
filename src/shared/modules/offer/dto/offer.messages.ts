import {
  MAX_DESCRIPTION_LENGTH, MAX_GUESTS_QUANTITY,
  MAX_NAME_LENGTH, MAX_PRICE, MAX_ROOM_QUANTITY,
  MIN_DESCRIPTION_LENGTH, MIN_GUESTS_QUANTITY,
  MIN_NAME_LENGTH, MIN_PRICE, MIN_ROOM_QUANTITY, PHOTOS_QUANTITY,
} from '../../../constants/offer.constants.js';

export const OfferValidationMessage = {
  name: {
    minLength: `Min name length is ${MIN_NAME_LENGTH} characters`,
    maxLength: `Max name length is ${MAX_NAME_LENGTH} characters`,
  },
  description: {
    minLength: `Min description length is ${MIN_DESCRIPTION_LENGTH}`,
    maxLength: `Max description length is ${MAX_DESCRIPTION_LENGTH}`,
  },
  date: {
    invalidFormat: 'date field must be a valid date',
  },
  location: {
    invalid: 'location field must be \'Paris\', \'Cologne\', \'Brussels\', \'Amsterdam\', \'Hamburg\' or \'Dusseldorf\'',
  },
  previewImage: {
    invalidFormat: 'previewImage must be of type string',
  },
  photos: {
    invalidFormat: 'photos field must be an array',
    invalidLength: `Array length must have length of ${PHOTOS_QUANTITY}`,
  },
  isPremium: {
    invalidFormat: 'isPremium field must be a boolean',
  },
  type: {
    invalid: 'type field must be a valid property type',
  },
  numberOfRooms: {
    invalidFormat: 'numberOfRooms field must be an integer',
    minValue: `Min number of rooms is ${MIN_ROOM_QUANTITY}`,
    maxValue: `Max number of rooms is ${MAX_ROOM_QUANTITY}`,
  },
  numberOfGuests: {
    invalidFormat: 'numberOfGuests field must be an integer',
    minValue: `Min number of guests is ${MIN_GUESTS_QUANTITY}`,
    maxValue: `Max number of guests is ${MAX_GUESTS_QUANTITY}`,
  },
  price: {
    invalidFormat: 'price field must be an integer',
    minValue: `Minimum price is ${MIN_PRICE}`,
    maxValue: `Maximum price is ${MAX_PRICE}`,
  },
  commodities: {
    invalidFormat: 'commodities field must be an array',
    invalid: 'commodity must be valid',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  coordinates: {
    invalidLatitude: 'latitude field must be a valid number',
    invalidLongitude: 'longitude field must be a valid number',
  },
} as const;
