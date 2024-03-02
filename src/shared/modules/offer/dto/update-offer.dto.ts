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
import { OfferValidationMessage } from '../index.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(MIN_NAME_LENGTH, { message: OfferValidationMessage.name.minLength})
  @MaxLength(MAX_NAME_LENGTH, {message: OfferValidationMessage.name.maxLength})
    name?: string;

  @IsOptional()
  @MinLength(MIN_DESCRIPTION_LENGTH, { message: OfferValidationMessage.description.minLength })
  @MaxLength(MAX_DESCRIPTION_LENGTH, { message: OfferValidationMessage.description.maxLength })
    description?: string;

  @IsOptional()
  @IsEnum(LocationEnum, { message: OfferValidationMessage.location.invalid })
    location?: Location;

  @IsOptional()
  @IsString({ message: OfferValidationMessage.previewImage.invalidFormat })
    previewImage?: string;

  @IsOptional()
  @IsArray({ message: OfferValidationMessage.photos.invalidFormat })
  @ArrayMinSize(PHOTOS_QUANTITY, { each: true, message: OfferValidationMessage.photos.invalidLength })
  @ArrayMaxSize(PHOTOS_QUANTITY, { each: true, message: OfferValidationMessage.photos.invalidLength })
    photos?: string[];

  @IsOptional()
  @IsBoolean({ message: OfferValidationMessage.isPremium.invalidFormat })
    isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferTypeEnum, { message: OfferValidationMessage.type.invalid })
    type?: OfferType;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.numberOfRooms.invalidFormat })
  @Min(MIN_ROOM_QUANTITY, { message: OfferValidationMessage.numberOfRooms.minValue })
  @Max(MAX_ROOM_QUANTITY, { message: OfferValidationMessage.numberOfRooms.maxValue })
    numberOfRooms?: number;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.numberOfGuests.invalidFormat })
  @Min(MIN_GUESTS_QUANTITY, { message: OfferValidationMessage.numberOfGuests.minValue })
  @Max(MAX_GUESTS_QUANTITY, { message: OfferValidationMessage.numberOfGuests.maxValue })
    numberOfGuests?: number;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.price.invalidFormat })
  @Min(MIN_PRICE, { message: OfferValidationMessage.price.minValue })
  @Max(MAX_PRICE, { message: OfferValidationMessage.price.maxValue })
    price?: string;

  @IsOptional()
  @IsArray({ message: OfferValidationMessage.commodities.invalidFormat })
  @IsEnum(CommodityEnum, { each: true, message: OfferValidationMessage.commodities.invalid })
    commodities?: Commodity[];

  @IsOptional()
  @ValidateNested()
    coordinates?: Coordinates;
}
