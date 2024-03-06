import { COMPONENT } from '../../types/component.enum.js';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { Container } from 'inversify';
import { AuthService, DefaultAuthService } from './index.js';
import { AuthExceptionFilter } from './auth.exception-filter.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<AuthService>(COMPONENT.AUTH_SERVICE).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(COMPONENT.AUTH_EXCEPTION_FILTER).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
