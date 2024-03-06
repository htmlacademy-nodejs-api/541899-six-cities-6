export enum RATING {
  LOWEST = 1,
  HIGHEST = 5
}

export enum ROOM {
  MIN_QUANTITY = 1,
  MAX_QUANTITY = 8,
}

export enum GUEST {
  MIN_QUANTITY = 1,
  MAX_QUANTITY = 10,
}

export enum NAME {
  MIN_LENGTH = 10,
  MAX_LENGTH = 100,
}

export enum PRICE {
  LOWEST = 100,
  HIGHEST = 100000,
}

export enum DESCRIPTION {
  MIN_LENGTH = 20,
  MAX_LENGTH = 1024,
}

export enum PHOTO {
  QUANTITY = 6,
}

export enum OFFER {
  MAX_QUANTITY = 60,
  MAX_PREMIUM_QUANTITY = 3,
}

export const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpg'
];
