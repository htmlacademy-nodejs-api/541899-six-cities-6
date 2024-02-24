import { defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_GUESTS_QUANTITY,
  MAX_PRICE,
  MAX_ROOM_QUANTITY,
  MIN_GUESTS_QUANTITY,
  MIN_PRICE,
  MIN_ROOM_QUANTITY,
} from '../../constants/offer.constants.js';
import { UserEntity } from '../user/user.entity.js';
import { OfferType } from '../../types/offer.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {
}

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    type: String,
    trim: true,
    required: true,
  })
    name: string;

  @prop({
    type: String,
    trim: true,
    required: true,
    maxlength: [MAX_DESCRIPTION_LENGTH],
  })
    description: string;

  @prop({
    type: Date,
    required: true,
  })
    date: Date;

  @prop({
    type: String,
    required: true,
  })
    location: string;

  @prop({
    type: String,
    required: true,
  })
    previewImage: string;

  @prop({
    type: () => [String],
    required: true,
    default: [],
  })
    photos: string[];

  @prop({
    type: Boolean,
    required: true,
  })
    isPremium: boolean;

  @prop({
    type: () => String,
    required: true,
  })
    type: OfferType;

  @prop({
    type: Number,
    required: true,
    min: [MIN_ROOM_QUANTITY, 'Min room quantity'],
    max: [MAX_ROOM_QUANTITY, 'Max room quantity'],
  })
    numberOfRooms: number;

  @prop({
    type: Number,
    required: true,
    min: [MIN_GUESTS_QUANTITY, 'Min guests quantity'],
    max: [MAX_GUESTS_QUANTITY, 'Max guests quantity'],
  })
    numberOfGuests: number;

  @prop({
    type: Number,
    required: true,
    min: [MIN_PRICE, 'Min price'],
    max: [MAX_PRICE, 'Max price'],
  })
    price: number;

  @prop({
    type: [String],
    required: true,
  })
    commodities: string[];

  @prop({
    type: String,
    ref: UserEntity,
    required: true,
  })
    userId: Ref<UserEntity>;

  @prop({
    required: true,
  })
    coordinates: {
    latitude: string;
    longitude: string;
  };
}

export const OfferModel = getModelForClass(OfferEntity);
