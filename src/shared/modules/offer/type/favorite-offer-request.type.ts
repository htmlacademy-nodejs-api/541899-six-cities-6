import { RequestBody, RequestParams } from '../../../libs/rest/index.js';
import { FavoriteOfferDto } from '../dto/favorite-offer.dto.js';
import { Request } from 'express';

export type FavoriteOfferRequest = Request<
  RequestParams,
  RequestBody,
  FavoriteOfferDto
>;
