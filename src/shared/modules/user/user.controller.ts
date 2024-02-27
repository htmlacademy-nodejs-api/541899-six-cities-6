import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { UserService } from './index.js';
import { StatusCodes } from 'http-status-codes';
import { UserRdo } from './rdo/user.rdo.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { CreateUserRequest } from './create-user-request.type.js';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Config } from '../../interfaces/config.interface.js';
import { RestSchema } from '../../libs/config/rest.schema.js';
import { Component } from '../../types/component.enum.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { fillDTO } from '../../helpers/support-functions.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);
    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
  }

  public async create({ body }: CreateUserRequest, res: Response): Promise<void> {
    const isExistingUser = await this.userService.findByEmail(body.email);

    if (isExistingUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }
}
