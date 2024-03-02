import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../../constants/comment.constants.js';
import { HIGHEST_RATING, LOWEST_RATING } from '../../../constants/offer.constants.js';

export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text field is required',
    lengthField: `text length must be in range between ${MIN_COMMENT_LENGTH} and ${MAX_COMMENT_LENGTH} characters`
  },
  rating: {
    invalidFormat: 'rating field must be an integer',
    minValue: `min rating is ${LOWEST_RATING}`,
    maxValue: `max rating is ${HIGHEST_RATING}`,
  },
  offerId: {
    invalidFormat: 'offerId must be a valid id'
  },
  userId: {
    invalidFormat: 'userId must be a valid id'
  },
} as const;
