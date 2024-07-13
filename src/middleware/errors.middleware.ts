import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import createDebug from 'debug';
import { type NextFunction, type Request, type Response } from 'express';
const debug = createDebug('TFD:errors:middleware');

export class HttpError extends Error {
  constructor(
    public status: number,
    public statusMessage: string,
    message?: string,
    options?: ErrorOptions
  ) {
    super(message, options);
  }
}
export class ErrorsMiddleware {
  constructor() {
    debug('Instantiated errors middleware');
  }

  handle(error: Error, _req: Request, res: Response, _next: NextFunction) {
    let status = 500;
    let json = {
      status: '500 Internal Server Error',
      message: error.message,
    };

    if (error instanceof HttpError) {
      debug('Error', error.message);
      status = error.status;
      json = {
        status: `${error.status} ${error.statusMessage}`,
        message: error.message,
      };
    } else if (error instanceof PrismaClientKnownRequestError) {
      debug('Prisma error', error.message);
      status = 403;
      json = {
        status: '403 Forbidden',
        message: error.message,
      };
    }

    debug('Request received', error.message);
    res.status(status);
    res.json(json);
  }
}
