import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../../constants/comment.constants.js';
import { HIGHEST_RATING, LOWEST_RATING } from '../../../constants/offer.constants.js';
import { CREATE_COMMENT_MESSAGES } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CREATE_COMMENT_MESSAGES.TEXT.INVALID_FORMAT })
  @Length(MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, { message: CREATE_COMMENT_MESSAGES.TEXT.LENGTH_FIELD})
    text: string;

  @IsInt({ message: CREATE_COMMENT_MESSAGES.RATING.INVALID_FORMAT })
  @Min(LOWEST_RATING, { message: CREATE_COMMENT_MESSAGES.RATING.MIN_VALUE })
  @Max(HIGHEST_RATING, { message: CREATE_COMMENT_MESSAGES.RATING.MAX_VALUE })
    rating: number;

  @IsMongoId({ message: CREATE_COMMENT_MESSAGES.OFFER_ID.INVALID_FORMAT })
    offerId: string;

  userId: string;
}
