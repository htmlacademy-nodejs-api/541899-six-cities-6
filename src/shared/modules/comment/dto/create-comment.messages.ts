import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../../constants/comment.constants.js';
import { HIGHEST_RATING, LOWEST_RATING } from '../../../constants/offer.constants.js';

export const CREATE_COMMENT_MESSAGES = {
  TEXT: {
    INVALID_FORMAT: 'text field is required',
    LENGTH_FIELD: `text length must be in range between ${MIN_COMMENT_LENGTH} and ${MAX_COMMENT_LENGTH} characters`
  },
  RATING: {
    INVALID_FORMAT: 'rating field must be an integer',
    MIN_VALUE: `min rating is ${LOWEST_RATING}`,
    MAX_VALUE: `max rating is ${HIGHEST_RATING}`,
  },
  OFFER_ID: {
    INVALID_FORMAT: 'offerId must be a valid id'
  },
} as const;
