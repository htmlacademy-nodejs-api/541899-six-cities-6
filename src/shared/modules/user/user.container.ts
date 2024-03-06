import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { UserService } from './user-service.interface.js';
import { DefaultUserService } from './default-user.service.js';
import { UserEntity, UserModel } from './user.entity.js';
import { COMPONENT } from '../../types/component.enum.js';
import { UserController } from './user.controller.js';
import { Controller } from '../../libs/rest/index.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(COMPONENT.USER_SERVICE).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(COMPONENT.USER_MODEL).toConstantValue(UserModel);
  userContainer.bind<Controller>(COMPONENT.USER_CONTROLLER).to(UserController).inSingletonScope();

  return userContainer;
}
