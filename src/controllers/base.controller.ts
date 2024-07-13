/* eslint-disable no-unused-vars */
import createDebug from 'debug';
import { type NextFunction, type Request, type Response } from 'express';
import type Joi from 'joi';
import { HttpError } from '../middleware/errors.middleware.js';
import { type Repo } from '../repositories/type.repo.js';
const debug = createDebug('TFD:base:controller');

export abstract class BaseController<T, C, U> {
  constructor(
    protected readonly repo: Repo<T, C>,
    protected readonly validateCreateDtoSchema: Joi.ObjectSchema<C>,
    protected readonly validateUpdateDtoSchema: Joi.ObjectSchema<U>
  ) {
    debug('Instantiated base controller');
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.readAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.repo.readById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {

    const { payload, ...rest } = req.body;

    const data = rest as C

    const {
      error,

      value,
    }: { error: Error | undefined; value: C } =
      this.validateCreateDtoSchema.validate(data, {
        abortEarly: false,
      });

    if (error) {
      console.log('error');
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.create(value);
      res.status(201);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const { payload, ...rest } = req.body;

    const { error } = this.validateUpdateDtoSchema.validate(rest, {
      abortEarly: false,
    });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.update(id, rest as Partial<C>);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.repo.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
