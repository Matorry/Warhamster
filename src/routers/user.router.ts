import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { type UserController } from '../controllers/user.controller.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('TFD:user:router');

export class UserRouter {
  router = createRouter();

  constructor(
    readonly controller: UserController,
    readonly authInterceptor: AuthInterceptor,
  ) {
    debug('Instantiated users router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));

    this.router.post(
      '/register',
      controller.create.bind(controller)
    );

    this.router.post('/login', controller.login.bind(controller));

    this.router.patch(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.update.bind(controller)
    );

    this.router.delete(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.delete.bind(controller)
    );
  }
}
