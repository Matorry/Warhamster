import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import {
  type User,
  type UserCreateDto,
  type UserUpdateDto,
} from '../entities/user.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { type Repo } from './type.repo.js';
const debug = createDebug('TFD:users:repository');

const select = {
  id: true,
  userName: true,
  email: true,
  role: true,
  birthDate: true,
  armyLists: {
    select: {
      id: true,
      name: true,
      roster: true,
      faction: true,
      subFaction: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  userMatchLists: {
    select: {
      id: true,
      match: {
        select: {
          id: true,
          date: true,
          result: true,
          details: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  },
};

export class UserRepo implements Repo<User, UserCreateDto> {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated users repository');
  }

  async readAll() {
    return this.prisma.user.findMany({
      select,
    });
  }

  async readById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select,
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    return user;
  }

  async searchForLogin(key: 'email' | 'username', value: string) {
    if (!['email', 'username'].includes(key)) {
      throw new HttpError(404, 'Not Found', 'Invalid query parameters');
    }

    const userData = await this.prisma.user.findFirst({
      where: {
        [key]: value,
      },
      select: {
        id: true,
        userName: true,
        email: true,
        role: true,
        pswd: true,
      },
    });

    if (!userData) {
      throw new HttpError(404, 'Not Found', `Invalid ${key} or password`);
    }

    return userData;
  }

  async create(data: UserCreateDto) {
    console.log('data', data);

    const newUser = this.prisma.user.create({
      data: {
        ...data,
        role: 'user',

      },
      select,
    });
    return newUser;
  }

  async update(id: string, data: Partial<UserUpdateDto>) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    const updatedUser = this.prisma.user.update({
      where: { id },
      data,
      select,
    });

    return updatedUser;
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    return this.prisma.user.delete({
      where: { id },
      select,
    });
  }

  async searchByUsername(userName: string) {
    return this.prisma.user.findMany({
      where: {
        userName: {
          contains: userName,
          mode: 'insensitive',
        },
      },
      select,
    });
  }
}
