import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { ArmyList, ArmyListCreateDto, ArmyListUpdateDto } from '../entities/armyList.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { type Repo } from './type.repo.js';
const debug = createDebug('TFD:users:repository');

const select = {
  id: true,
  name: true,
  roster: true,
  faction: true,
  subFaction: true,
  createdAt: true,
  updatedAt: true,
  ownerId: false,
  owner: {
    select: {
      id: true,
      userName: true,
      email: true,
      role: true,
      birthDate: true,
    },
  },
};

export class ArmyListRepo implements Repo<ArmyList, ArmyListCreateDto> {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated users repository');
  }

  async readAll() {
    return this.prisma.armyList.findMany({
      select,
    });
  }

  async readById(id: string) {
    const armyList = await this.prisma.armyList.findUnique({
      where: { id },
      select,
    });
    if (!armyList) {
      throw new HttpError(404, 'Not Found', `Army list ${id} not found`);
    }

    return armyList;
  }

  async readByOwner(ownerId: string) {
    const armyList = await this.prisma.armyList.findMany({
      where: { ownerId },
      select,
    });
    if (!armyList) {
      throw new HttpError(404, 'Not Found', `Army list of user ${ownerId} not found`);
    }

    return armyList;
  }

  async create(data: ArmyListCreateDto) {
    console.log('data', data);

    const newArmyList = this.prisma.armyList.create({
      data,
      select,
    });
    return newArmyList;
  }

  async update(id: string, data: ArmyListUpdateDto) {
    const armyList = await this.prisma.armyList.findUnique({
      where: { id },
    });
    if (!armyList) {
      throw new HttpError(404, 'Not Found', `Army list ${id} not found`);
    }

    const updatedArmyList = this.prisma.armyList.update({
      where: { id },
      data,
      select,
    });

    return updatedArmyList;
  }

  async delete(id: string) {
    const armyList = await this.prisma.armyList.findUnique({
      where: { id },
    });
    if (!armyList) {
      throw new HttpError(404, 'Not Found', `Army list ${id} not found`);
    }

    return this.prisma.armyList.delete({
      where: { id },
      select,
    });
  }
}
