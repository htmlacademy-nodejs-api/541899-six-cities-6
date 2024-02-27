import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { OfferDto } from './dto/offer.dto.js';

export type CreateOfferRequest = Request<RequestParams, RequestBody, OfferDto>;
