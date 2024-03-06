import { defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import {
  DESCRIPTION,
  GUEST,
  PRICE,
  ROOM,
} from '../../constants/offer.constants.js';
import { UserEntity } from '../user/user.entity.js';
import { Commodity, Location, OfferType } from '../../types/offer.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

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
    maxlength: [DESCRIPTION.MAX_LENGTH],
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
    location: Location;

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
    min: [ROOM.MIN_QUANTITY, 'Min room quantity'],
    max: [ROOM.MAX_QUANTITY, 'Max room quantity'],
  })
    numberOfRooms: number;

  @prop({
    type: Number,
    required: true,
    min: [GUEST.MIN_QUANTITY, 'Min guests quantity'],
    max: [GUEST.MAX_QUANTITY, 'Max guests quantity'],
  })
    numberOfGuests: number;

  @prop({
    type: Number,
    required: true,
    min: [PRICE.LOWEST, 'Min price'],
    max: [PRICE.HIGHEST, 'Max price'],
  })
    price: number;

  @prop({
    type: [String],
    required: true,
  })
    commodities: Commodity[];

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
