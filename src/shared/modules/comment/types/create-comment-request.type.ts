import { CreateCommentDto } from '../index.js';
import { RequestBody, RequestParams } from '../../../libs/rest/index.js';
import { Request } from 'express';

export type CreateCommentRequest = Request<RequestParams, RequestBody, CreateCommentDto>;
