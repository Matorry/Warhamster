import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { MatchController } from '../controllers/match.controller.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('TFD:match:router');

export class MatchRouter {
  router = createRouter();

  constructor(
    readonly controller: MatchController,
    readonly authInterceptor: AuthInterceptor,
  ) {
    debug('Instantiated match router');

    this.router.get('/', authInterceptor.authentication.bind(authInterceptor), controller.getAll.bind(controller));
    this.router.get('/:id', authInterceptor.authentication.bind(authInterceptor), controller.getById.bind(controller));
    this.router.get('/participant/:participantId', authInterceptor.authentication.bind(authInterceptor), controller.readByParticipant.bind(controller));

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

    // MatchParticipant
    this.router.post(
      '/:id/participants',
      authInterceptor.authentication.bind(authInterceptor),
      controller.addParticipant.bind(controller)
    );
    this.router.patch(
      '/participants/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.updateParticipant.bind(controller)
    );
    this.router.delete(
      '/participants/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.removeParticipant.bind(controller)
    );
  }
}
