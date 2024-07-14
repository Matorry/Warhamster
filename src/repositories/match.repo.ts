import { Match, PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { MatchCreateDto, MatchUpdateDto } from '../entities/match';
import { HttpError } from '../middleware/errors.middleware';
import { Repo } from './type.repo';

const debug = createDebug('TFD:matches:repository');

const select = {
  id: true,
  date: true,
  result: true,
  details: true,
  createdAt: true,
  updatedAt: true,
  tournamentId: false,
  participants: {
    select: {
      id: true,
      userId: true,
      armyId: true,
    },
  },
};

export class MatchRepo implements Repo<Match, MatchCreateDto> {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated matches repository');
  }

  async readAll(): Promise<Match[]> {
    return this.prisma.match.findMany({
      select,
    });
  }

  async readById(id: string): Promise<Match> {
    const match = await this.prisma.match.findUnique({
      where: { id },
      select,
    });
    if (!match) {
      throw new HttpError(404, 'Not Found', `Match ${id} not found`);
    }

    return match;
  }

  async create(data: MatchCreateDto): Promise<Match> {
    const newMatch = await this.prisma.match.create({
      data,
      select,
    });
    return newMatch;
  }

  async update(id: string, data: MatchUpdateDto): Promise<Match> {
    const match = await this.prisma.match.findUnique({
      where: { id },
    });
    if (!match) {
      throw new HttpError(404, 'Not Found', `Match ${id} not found`);
    }

    const updatedMatch = await this.prisma.match.update({
      where: { id },
      data,
      select,
    });

    return updatedMatch;
  }

  async delete(id: string): Promise<Match> {
    const match = await this.prisma.match.findUnique({
      where: { id },
    });
    if (!match) {
      throw new HttpError(404, 'Not Found', `Match ${id} not found`);
    }

    return this.prisma.match.delete({
      where: { id },
      select,
    });
  }
}
