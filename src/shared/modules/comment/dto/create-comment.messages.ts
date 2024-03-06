import { COMMENT } from '../../../constants/comment.constants.js';
import { RATING } from '../../../constants/offer.constants.js';

export const CREATE_COMMENT_MESSAGES = {
  TEXT: {
    INVALID_FORMAT: 'text field is required',
    LENGTH_FIELD: `text length must be in range between ${COMMENT.MIN_LENGTH} and ${COMMENT.MAX_LENGTH} characters`
  },
  RATING: {
    INVALID_FORMAT: 'rating field must be an integer',
    MIN_VALUE: `min rating is ${RATING.LOWEST}`,
    MAX_VALUE: `max rating is ${RATING.HIGHEST}`,
  },
  OFFER_ID: {
    INVALID_FORMAT: 'offerId must be a valid id'
  },
} as const;
