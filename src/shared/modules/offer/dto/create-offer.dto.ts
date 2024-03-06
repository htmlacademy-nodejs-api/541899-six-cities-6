import {
  Commodity,
  CommodityEnum, Coordinates,
  Location,
  LocationEnum,
  OfferType,
  OfferTypeEnum,
} from '../../../types/offer.type.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray, IsBoolean,
  IsDateString,
  IsEnum, IsInt,
  IsString, Max,
  MaxLength, Min,
  MinLength, ValidateNested,
} from 'class-validator';
import {
  MAX_DESCRIPTION_LENGTH, MAX_GUESTS_QUANTITY, MAX_NAME_LENGTH, MAX_PRICE, MAX_ROOM_QUANTITY,
  MIN_DESCRIPTION_LENGTH, MIN_GUESTS_QUANTITY, MIN_NAME_LENGTH, MIN_PRICE,
  MIN_ROOM_QUANTITY,
  PHOTOS_QUANTITY,
} from '../../../constants/offer.constants.js';
import { OFFER_VALIDATION_MESSAGES } from '../index.js';

export class CreateOfferDto {
  @MinLength(MIN_NAME_LENGTH, { message: OFFER_VALIDATION_MESSAGES.NAME.MIN_LENGTH})
  @MaxLength(MAX_NAME_LENGTH, {message: OFFER_VALIDATION_MESSAGES.NAME.MAX_LENGTH})
    name: string;

  @MinLength(MIN_DESCRIPTION_LENGTH, { message: OFFER_VALIDATION_MESSAGES.DESCRIPTION.MIN_LENGTH })
  @MaxLength(MAX_DESCRIPTION_LENGTH, { message: OFFER_VALIDATION_MESSAGES.DESCRIPTION.MAX_LENGTH })
    description: string;

  @IsDateString({}, { message: OFFER_VALIDATION_MESSAGES.DATE.INVALID_FORMAT })
    date: Date;

  @IsEnum(LocationEnum, { message: OFFER_VALIDATION_MESSAGES.LOCATION.INVALID })
    location: Location;

  @IsString({ message: OFFER_VALIDATION_MESSAGES.PREVIEW_IMAGE.INVALID_FORMAT })
    previewImage: string;

  @IsArray({ message: OFFER_VALIDATION_MESSAGES.PHOTOS.INVALID_FORMAT })
  @ArrayMinSize(PHOTOS_QUANTITY, { each: true, message: OFFER_VALIDATION_MESSAGES.PHOTOS.INVALID_LENGTH })
  @ArrayMaxSize(PHOTOS_QUANTITY, { each: true, message: OFFER_VALIDATION_MESSAGES.PHOTOS.INVALID_LENGTH })
    photos: string[];

  @IsBoolean({ message: OFFER_VALIDATION_MESSAGES.IS_PREMIUM.INVALID_FORMAT })
    isPremium: boolean;

  @IsEnum(OfferTypeEnum, { message: OFFER_VALIDATION_MESSAGES.TYPE.INVALID })
    type: OfferType;

  @IsInt({ message: OFFER_VALIDATION_MESSAGES.NUMBER_OF_ROOMS.INVALID_FORMAT })
  @Min(MIN_ROOM_QUANTITY, { message: OFFER_VALIDATION_MESSAGES.NUMBER_OF_ROOMS.MIN_VALUE })
  @Max(MAX_ROOM_QUANTITY, { message: OFFER_VALIDATION_MESSAGES.NUMBER_OF_ROOMS.MAX_VALUE })
    numberOfRooms: number;

  @IsInt({ message: OFFER_VALIDATION_MESSAGES.NUMBER_OF_GUESTS.INVALID_FORMAT })
  @Min(MIN_GUESTS_QUANTITY, { message: OFFER_VALIDATION_MESSAGES.NUMBER_OF_GUESTS.MIN_VALUE })
  @Max(MAX_GUESTS_QUANTITY, { message: OFFER_VALIDATION_MESSAGES.NUMBER_OF_GUESTS.MAX_VALUE })
    numberOfGuests: number;

  @IsInt({ message: OFFER_VALIDATION_MESSAGES.PRICE.INVALID_FORMAT })
  @Min(MIN_PRICE, { message: OFFER_VALIDATION_MESSAGES.PRICE.MIN_VALUE })
  @Max(MAX_PRICE, { message: OFFER_VALIDATION_MESSAGES.PRICE.MAX_VALUE })
    price: string;

  @IsArray({ message: OFFER_VALIDATION_MESSAGES.COMMODITIES.INVALID_FORMAT })
  @IsEnum(CommodityEnum, { each: true, message: OFFER_VALIDATION_MESSAGES.COMMODITIES.INVALID })
    commodities: Commodity[];

  userId: string;

  @ValidateNested()
    coordinates: Coordinates;
}
