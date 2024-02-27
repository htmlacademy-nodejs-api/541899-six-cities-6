import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { UserDto } from './dto/user.dto.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, UserDto>;
