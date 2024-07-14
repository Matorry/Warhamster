import { MatchParticipant, PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { MatchParticipantCreateDto, MatchParticipantUpdateDto } from '../entities/matchParticipant.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { Repo } from './type.repo.js';

const debug = createDebug('TFD:matchParticipant:repository');

const select = {
  id: true,
  user: {
    select: {
      id: true,
      userName: true,
      email: true,
    },
  },
  army: {
    select: {
      id: true,
      name: true,
      faction: true,
    },
  },
  match: {
    select: {
      id: true,
      date: true,
      result: true,
      details: true,
      createdAt: false,
      updatedAt: false
    },
  },
  createdAt: true,
  updatedAt: true,
  userId: false,
  armyId: false,
  matchId: false
};

export class MatchParticipantRepo implements Repo<MatchParticipant, MatchParticipantCreateDto> {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated matchParticipant repository');
  }

  async readAll() {
    return this.prisma.matchParticipant.findMany({
      select,
    });
  }

  async readById(id: string) {
    const participant = await this.prisma.matchParticipant.findUnique({
      where: { id },
      select,
    });
    if (!participant) {
      throw new HttpError(404, 'Not Found', `MatchParticipant ${id} not found`);
    }

    return participant;
  }

  async create(data: MatchParticipantCreateDto) {
    const newParticipant = this.prisma.matchParticipant.create({
      data,
      select,
    });
    return newParticipant;
  }

  async update(id: string, data: MatchParticipantUpdateDto) {
    const participant = await this.prisma.matchParticipant.findUnique({
      where: { id },
    });
    if (!participant) {
      throw new HttpError(404, 'Not Found', `MatchParticipant ${id} not found`);
    }

    const updatedParticipant = this.prisma.matchParticipant.update({
      where: { id },
      data,
      select,
    });
    return updatedParticipant;
  }

  async delete(id: string) {
    const participant = await this.prisma.matchParticipant.findUnique({
      where: { id },
    });
    if (!participant) {
      throw new HttpError(404, 'Not Found', `MatchParticipant ${id} not found`);
    }

    return this.prisma.matchParticipant.delete({
      where: { id },
      select,
    });
  }
}
