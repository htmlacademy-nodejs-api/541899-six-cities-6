import { Response, Router } from 'express';
import { Route } from '../index.js';

export interface Controller {
  readonly router: Router;
  addRoute(route: Route): void;
  send<T>(res: Response, statusCode: number, data: T): void;
  returnOkStatus<T>(res: Response, data: T): void;
  returnCreatedStatus<T>(res: Response, data: T): void;
  returnNoContentStatus<T>(res: Response, data: T): void;
}
