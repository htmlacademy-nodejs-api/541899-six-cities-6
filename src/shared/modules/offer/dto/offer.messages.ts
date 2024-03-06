import {
  MAX_DESCRIPTION_LENGTH, MAX_GUESTS_QUANTITY,
  MAX_NAME_LENGTH, MAX_PRICE, MAX_ROOM_QUANTITY,
  MIN_DESCRIPTION_LENGTH, MIN_GUESTS_QUANTITY,
  MIN_NAME_LENGTH, MIN_PRICE, MIN_ROOM_QUANTITY, PHOTOS_QUANTITY,
} from '../../../constants/offer.constants.js';

export const OFFER_VALIDATION_MESSAGES = {
  NAME: {
    MIN_LENGTH: `Min name length is ${MIN_NAME_LENGTH} characters`,
    MAX_LENGTH: `Max name length is ${MAX_NAME_LENGTH} characters`,
  },
  DESCRIPTION: {
    MIN_LENGTH: `Min description length is ${MIN_DESCRIPTION_LENGTH}`,
    MAX_LENGTH: `Max description length is ${MAX_DESCRIPTION_LENGTH}`,
  },
  DATE: {
    INVALID_FORMAT: 'date field must be a valid date',
  },
  LOCATION: {
    INVALID: 'location field must be \'Paris\', \'Cologne\', \'Brussels\', \'Amsterdam\', \'Hamburg\' or \'Dusseldorf\'',
  },
  PREVIEW_IMAGE: {
    INVALID_FORMAT: 'previewImage must be of type string',
  },
  PHOTOS: {
    INVALID_FORMAT: 'photos field must be an array',
    INVALID_LENGTH: `Array length must have length of ${PHOTOS_QUANTITY}`,
  },
  IS_PREMIUM: {
    INVALID_FORMAT: 'isPremium field must be a boolean',
  },
  TYPE: {
    INVALID: 'type field must be a valid property type',
  },
  NUMBER_OF_ROOMS: {
    INVALID_FORMAT: 'numberOfRooms field must be an integer',
    MIN_VALUE: `Min number of rooms is ${MIN_ROOM_QUANTITY}`,
    MAX_VALUE: `Max number of rooms is ${MAX_ROOM_QUANTITY}`,
  },
  NUMBER_OF_GUESTS: {
    INVALID_FORMAT: 'numberOfGuests field must be an integer',
    MIN_VALUE: `Min number of guests is ${MIN_GUESTS_QUANTITY}`,
    MAX_VALUE: `Max number of guests is ${MAX_GUESTS_QUANTITY}`,
  },
  PRICE: {
    INVALID_FORMAT: 'price field must be an integer',
    MIN_VALUE: `Minimum price is ${MIN_PRICE}`,
    MAX_VALUE: `Maximum price is ${MAX_PRICE}`,
  },
  COMMODITIES: {
    INVALID_FORMAT: 'commodities field must be an array',
    INVALID: 'commodity must be valid',
  },
} as const;
