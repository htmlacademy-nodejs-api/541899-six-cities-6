import {
  GUEST,
  NAME, PRICE, ROOM,
  DESCRIPTION, PHOTO,
} from '../../../constants/offer.constants.js';

export const OFFER_VALIDATION_MESSAGES = {
  NAME: {
    MIN_LENGTH: `Min name length is ${NAME.MIN_LENGTH} characters`,
    MAX_LENGTH: `Max name length is ${NAME.MAX_LENGTH} characters`,
  },
  DESCRIPTION: {
    MIN_LENGTH: `Min description length is ${DESCRIPTION.MIN_LENGTH}`,
    MAX_LENGTH: `Max description length is ${DESCRIPTION.MAX_LENGTH}`,
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
    INVALID_LENGTH: `Array length must have length of ${PHOTO.QUANTITY}`,
  },
  IS_PREMIUM: {
    INVALID_FORMAT: 'isPremium field must be a boolean',
  },
  TYPE: {
    INVALID: 'type field must be a valid property type',
  },
  NUMBER_OF_ROOMS: {
    INVALID_FORMAT: 'numberOfRooms field must be an integer',
    MIN_VALUE: `Min number of rooms is ${ROOM.MIN_QUANTITY}`,
    MAX_VALUE: `Max number of rooms is ${ROOM.MAX_QUANTITY}`,
  },
  NUMBER_OF_GUESTS: {
    INVALID_FORMAT: 'numberOfGuests field must be an integer',
    MIN_VALUE: `Min number of guests is ${GUEST.MIN_QUANTITY}`,
    MAX_VALUE: `Max number of guests is ${GUEST.MAX_QUANTITY}`,
  },
  PRICE: {
    INVALID_FORMAT: 'price field must be an integer',
    MIN_VALUE: `Minimum price is ${PRICE.LOWEST}`,
    MAX_VALUE: `Maximum price is ${PRICE.HIGHEST}`,
  },
  COMMODITIES: {
    INVALID_FORMAT: 'commodities field must be an array',
    INVALID: 'commodity must be valid',
  },
} as const;
