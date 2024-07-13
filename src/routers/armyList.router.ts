import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { type ArmyListController } from '../controllers/armyList.controller.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('TFD:army:router');

export class ArmyListRouter {
  router = createRouter();

  constructor(
    readonly controller: ArmyListController,
    readonly authInterceptor: AuthInterceptor,
  ) {
    debug('Instantiated army list router');

    this.router.get('/', authInterceptor.authentication.bind(authInterceptor), controller.getAll.bind(controller));
    this.router.get('/:id', authInterceptor.authentication.bind(authInterceptor), controller.getById.bind(controller));
    this.router.get('/owner/:ownerId', authInterceptor.authentication.bind(authInterceptor), controller.readByOwner.bind(controller));

    this.router.post(
      '/',
      authInterceptor.authentication.bind(authInterceptor),
      controller.create.bind(controller)
    );

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
