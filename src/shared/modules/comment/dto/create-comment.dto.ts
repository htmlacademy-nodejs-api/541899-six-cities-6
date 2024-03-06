import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { COMMENT } from '../../../constants/comment.constants.js';
import { RATING } from '../../../constants/offer.constants.js';
import { CREATE_COMMENT_MESSAGES } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CREATE_COMMENT_MESSAGES.TEXT.INVALID_FORMAT })
  @Length(COMMENT.MIN_LENGTH, COMMENT.MAX_LENGTH, { message: CREATE_COMMENT_MESSAGES.TEXT.LENGTH_FIELD})
    text: string;

  @IsInt({ message: CREATE_COMMENT_MESSAGES.RATING.INVALID_FORMAT })
  @Min(RATING.LOWEST, { message: CREATE_COMMENT_MESSAGES.RATING.MIN_VALUE })
  @Max(RATING.HIGHEST, { message: CREATE_COMMENT_MESSAGES.RATING.MAX_VALUE })
    rating: number;

  @IsMongoId({ message: CREATE_COMMENT_MESSAGES.OFFER_ID.INVALID_FORMAT })
    offerId: string;

  userId: string;
}
