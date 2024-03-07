import { CreateCommentDto } from '../index.js';
import { RequestBody } from '../../../libs/rest/index.js';
import { Request } from 'express';
import { ParamOfferId } from '../../offer/type/param-offerid.type.js';

export type CreateCommentRequest = Request<ParamOfferId, RequestBody, CreateCommentDto>;
