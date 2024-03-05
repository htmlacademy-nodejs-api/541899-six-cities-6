// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
    text: string;

  @prop({ required: true })
    rating: number;

  @prop({
    ref: OfferEntity,
    required: true,
  })
    offerId: Ref<OfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
    userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
