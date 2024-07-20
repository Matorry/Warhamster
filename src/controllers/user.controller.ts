import createDebug from 'debug';
import { type NextFunction, type Request, type Response } from 'express';
import { type User, type UserCreateDto, type UserUpdateDto } from '../entities/user';
import { userCreateDtoSchema, userUpdateDtoSchema } from '../entities/user.schema.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { type WithLoginRepo } from '../repositories/type.repo.js';
import { Auth } from '../services/auth.service.js';
import { BaseController } from './base.controller.js';
const debug = createDebug('TFD:users:controller');

export class UserController extends BaseController<User, UserCreateDto, UserUpdateDto> {
  private static instance: UserController;

  private constructor(protected readonly repo: WithLoginRepo<User, UserCreateDto>) {
    super(repo, userCreateDtoSchema, userUpdateDtoSchema);
    debug('Instantiated users controller');
  }

  static getInstance(repo: WithLoginRepo<User, UserCreateDto>) {
    if (!UserController.instance) {
      UserController.instance = new UserController(repo);
    }

    return UserController.instance;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, userName, pswd } = req.body as UserCreateDto;

    if ((!email && !userName) || !pswd) {
      next(
        new HttpError(
          400,
          'Bad Request',
          'Email/username and password are required'
        )
      );
      return;
    }

    const error = new HttpError(
      401,
      'Unauthorized',
      'Email/username and password invalid'
    );

    try {
      const user = await this.repo.searchForLogin(
        email ? 'email' : 'username',
        email || userName
      );

      if (!user) {
        next(error);
        return;
      }

      if (!(await Auth.compare(pswd, user.pswd!))) {
        next(error);
        console.log(error);
        return;
      }

      const token = Auth.signJwt({
        id: user.id!,
        role: user.role!,
      });

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    if (!req.body.pswd || typeof req.body.pswd !== 'string') {
      next(
        new HttpError(
          400,
          'Bad Request',
          'Password is required and must be a string'
        )
      );
      return;
    }

    req.body.pswd = await Auth.hash(req.body.pswd as string);

    await super.create(req, res, next);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const allowedFields = [
      'userName',
      'email',
      'pswd',
      'birthDate',
    ];

    const filteredBody: Partial<User> = {};

    Object.keys(req.body as User).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredBody[key as keyof Partial<User>] = req.body[key as keyof User];
      }
    });

    req.body = filteredBody;

    if (req.body.pswd && typeof req.body.pswd === 'string') {
      req.body.pswd = await Auth.hash(req.body.pswd as string);
    }

    const dateString = req.body.birthDate as string;
    const date = new Date(dateString);

    if (req.body.birthDate) {
      req.body.birthDate = date.toISOString();
    }

    await super.update(req, res, next);
  }

  async searchByUsername(req: Request, res: Response, next: NextFunction) {
    try {
      const username = req.query.username as string | undefined;

      if (username === undefined) {
        return res.status(400).json({ error: 'username parameter is missing' });
      }

      const users = await this.repo.searchByUsername(username);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}
