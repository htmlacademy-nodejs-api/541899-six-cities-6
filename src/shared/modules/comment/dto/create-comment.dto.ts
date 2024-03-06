import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../../constants/comment.constants.js';
import { HIGHEST_RATING, LOWEST_RATING } from '../../../constants/offer.constants.js';
import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, { message: CreateCommentMessages.text.lengthField})
    text: string;

  @IsInt({ message: CreateCommentMessages.rating.invalidFormat })
  @Min(LOWEST_RATING, { message: CreateCommentMessages.rating.minValue })
  @Max(HIGHEST_RATING, { message: CreateCommentMessages.rating.maxValue })
    rating: number;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
    offerId: string;

  userId: string;
}
