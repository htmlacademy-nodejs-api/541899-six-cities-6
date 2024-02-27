import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { Request } from 'express';
import { OfferDto } from './dto/offer.dto.js';

export type UpdateOfferRequest = Request<RequestParams, RequestBody, OfferDto>;
