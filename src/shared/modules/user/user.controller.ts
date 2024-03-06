import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { UserService } from './index.js';
import { StatusCodes } from 'http-status-codes';
import { UserRdo } from './rdo/user.rdo.js';
import { Logger } from '../../interfaces/logger.interface.js';
import { CreateUserRequest } from './create-user-request.type.js';
import { BaseController, HttpMethod, UploadFileMiddleware, ValidateDtoMiddleware, PrivateRouteMiddleware } from '../../libs/rest/index.js';
import { Config } from '../../interfaces/config.interface.js';
import { RestSchema } from '../../libs/config/rest.schema.js';
import { COMPONENT } from '../../types/component.enum.js';
import { HttpError } from '../../libs/rest/errors/http.error.js';
import { fillDTO } from '../../helpers/support-functions.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { LoginUserRequest } from './login-user-request.type.js';
import { AuthService } from '../auth/index.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';
import { UploadUserAvatarRdo } from './rdo/upload-user-avatar.rdo.js';
import { ALLOWED_AVATAR_IMAGE_TYPES } from './user.constant.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(COMPONENT.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT.USER_SERVICE) private readonly userService: UserService,
    @inject(COMPONENT.CONFIG) private readonly configService: Config<RestSchema>,
    @inject(COMPONENT.AUTH_SERVICE) private readonly authService: AuthService
  ) {
    super(logger);
    this.addRoutes();
  }

  private addRoutes() {
    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
      middlewares: [new PrivateRouteMiddleware()]
    });
    this.addRoute({
      path: '/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar', ALLOWED_AVATAR_IMAGE_TYPES),
      ],
    });
  }

  async create({ body }: CreateUserRequest, res: Response): Promise<void> {
    const isExistingUser = await this.userService.findByEmail(body.email);

    if (isExistingUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email "${body.email}" already exists`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.returnCreatedStatus(res, fillDTO(UserRdo, result));
  }

  async login(
    { body }: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);
    this.returnOkStatus(res, Object.assign(responseData, { token }));
  }

  async checkAuthenticate({ tokenPayload: { email }}: Request, res: Response): Promise<void> {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.returnOkStatus(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  async uploadAvatar({ tokenPayload: { id }, file }: Request, res: Response) {
    const uploadedFile = { avatar: file?.filename };
    await this.userService.updateById(id, uploadedFile);
    this.returnCreatedStatus(res, fillDTO(UploadUserAvatarRdo, { filepath: uploadedFile.avatar }));
  }
}
