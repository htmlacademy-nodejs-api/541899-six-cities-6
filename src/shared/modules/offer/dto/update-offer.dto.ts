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
  IsEnum, IsInt, IsOptional,
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
import { OFFER_VALIDATION_MESSAGES } from './offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(MIN_NAME_LENGTH, { message: OFFER_VALIDATION_MESSAGES.name.minLength})
  @MaxLength(MAX_NAME_LENGTH, {message: OFFER_VALIDATION_MESSAGES.name.maxLength})
    name?: string;

  @IsOptional()
  @MinLength(MIN_DESCRIPTION_LENGTH, { message: OFFER_VALIDATION_MESSAGES.description.minLength })
  @MaxLength(MAX_DESCRIPTION_LENGTH, { message: OFFER_VALIDATION_MESSAGES.description.maxLength })
    description?: string;

  @IsOptional()
  @IsEnum(LocationEnum, { message: OFFER_VALIDATION_MESSAGES.location.invalid })
    location?: Location;

  @IsOptional()
  @IsString({ message: OFFER_VALIDATION_MESSAGES.previewImage.invalidFormat })
    previewImage?: string;

  @IsOptional()
  @IsArray({ message: OFFER_VALIDATION_MESSAGES.photos.invalidFormat })
  @ArrayMinSize(PHOTOS_QUANTITY, { each: true, message: OFFER_VALIDATION_MESSAGES.photos.invalidLength })
  @ArrayMaxSize(PHOTOS_QUANTITY, { each: true, message: OFFER_VALIDATION_MESSAGES.photos.invalidLength })
    photos?: string[];

  @IsOptional()
  @IsBoolean({ message: OFFER_VALIDATION_MESSAGES.isPremium.invalidFormat })
    isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferTypeEnum, { message: OFFER_VALIDATION_MESSAGES.type.invalid })
    type?: OfferType;

  @IsOptional()
  @IsInt({ message: OFFER_VALIDATION_MESSAGES.numberOfRooms.invalidFormat })
  @Min(MIN_ROOM_QUANTITY, { message: OFFER_VALIDATION_MESSAGES.numberOfRooms.minValue })
  @Max(MAX_ROOM_QUANTITY, { message: OFFER_VALIDATION_MESSAGES.numberOfRooms.maxValue })
    numberOfRooms?: number;

  @IsOptional()
  @IsInt({ message: OFFER_VALIDATION_MESSAGES.numberOfGuests.invalidFormat })
  @Min(MIN_GUESTS_QUANTITY, { message: OFFER_VALIDATION_MESSAGES.numberOfGuests.minValue })
  @Max(MAX_GUESTS_QUANTITY, { message: OFFER_VALIDATION_MESSAGES.numberOfGuests.maxValue })
    numberOfGuests?: number;

  @IsOptional()
  @IsInt({ message: OFFER_VALIDATION_MESSAGES.price.invalidFormat })
  @Min(MIN_PRICE, { message: OFFER_VALIDATION_MESSAGES.price.minValue })
  @Max(MAX_PRICE, { message: OFFER_VALIDATION_MESSAGES.price.maxValue })
    price?: string;

  @IsOptional()
  @IsArray({ message: OFFER_VALIDATION_MESSAGES.commodities.invalidFormat })
  @IsEnum(CommodityEnum, { each: true, message: OFFER_VALIDATION_MESSAGES.commodities.invalid })
    commodities?: Commodity[];

  @IsOptional()
  @ValidateNested()
    coordinates?: Coordinates;
}
