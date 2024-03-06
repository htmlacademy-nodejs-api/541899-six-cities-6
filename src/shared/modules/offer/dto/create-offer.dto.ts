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
  @MinLength(MIN_NAME_LENGTH, { message: OFFER_VALIDATION_MESSAGES.name.minLength})
  @MaxLength(MAX_NAME_LENGTH, {message: OFFER_VALIDATION_MESSAGES.name.maxLength})
    name: string;

  @MinLength(MIN_DESCRIPTION_LENGTH, { message: OFFER_VALIDATION_MESSAGES.description.minLength })
  @MaxLength(MAX_DESCRIPTION_LENGTH, { message: OFFER_VALIDATION_MESSAGES.description.maxLength })
    description: string;

  @IsDateString({}, { message: OFFER_VALIDATION_MESSAGES.date.invalidFormat })
    date: Date;

  @IsEnum(LocationEnum, { message: OFFER_VALIDATION_MESSAGES.location.invalid })
    location: Location;

  @IsString({ message: OFFER_VALIDATION_MESSAGES.previewImage.invalidFormat })
    previewImage: string;

  @IsArray({ message: OFFER_VALIDATION_MESSAGES.photos.invalidFormat })
  @ArrayMinSize(PHOTOS_QUANTITY, { each: true, message: OFFER_VALIDATION_MESSAGES.photos.invalidLength })
  @ArrayMaxSize(PHOTOS_QUANTITY, { each: true, message: OFFER_VALIDATION_MESSAGES.photos.invalidLength })
    photos: string[];

  @IsBoolean({ message: OFFER_VALIDATION_MESSAGES.isPremium.invalidFormat })
    isPremium: boolean;

  @IsEnum(OfferTypeEnum, { message: OFFER_VALIDATION_MESSAGES.type.invalid })
    type: OfferType;

  @IsInt({ message: OFFER_VALIDATION_MESSAGES.numberOfRooms.invalidFormat })
  @Min(MIN_ROOM_QUANTITY, { message: OFFER_VALIDATION_MESSAGES.numberOfRooms.minValue })
  @Max(MAX_ROOM_QUANTITY, { message: OFFER_VALIDATION_MESSAGES.numberOfRooms.maxValue })
    numberOfRooms: number;

  @IsInt({ message: OFFER_VALIDATION_MESSAGES.numberOfGuests.invalidFormat })
  @Min(MIN_GUESTS_QUANTITY, { message: OFFER_VALIDATION_MESSAGES.numberOfGuests.minValue })
  @Max(MAX_GUESTS_QUANTITY, { message: OFFER_VALIDATION_MESSAGES.numberOfGuests.maxValue })
    numberOfGuests: number;

  @IsInt({ message: OFFER_VALIDATION_MESSAGES.price.invalidFormat })
  @Min(MIN_PRICE, { message: OFFER_VALIDATION_MESSAGES.price.minValue })
  @Max(MAX_PRICE, { message: OFFER_VALIDATION_MESSAGES.price.maxValue })
    price: string;

  @IsArray({ message: OFFER_VALIDATION_MESSAGES.commodities.invalidFormat })
  @IsEnum(CommodityEnum, { each: true, message: OFFER_VALIDATION_MESSAGES.commodities.invalid })
    commodities: Commodity[];

  userId: string;

  @ValidateNested()
    coordinates: Coordinates;
}
