import { PrismaClient, Tournament } from '@prisma/client';
import createDebug from 'debug';
import { TournamentCreateDto, TournamentUpdateDto } from '../entities/tournament.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { Repo } from './type.repo.js';

const debug = createDebug('TFD:tournaments:repository');

const select = {
  id: true,
  name: true,
  description: true,
  startDate: true,
  endDate: true,
  result: true,
  details: true,
  createdAt: true,
  updatedAt: true,
  participants: {
    select: {
      id: true,
      userName: true,
      email: true,
    },
  },
  matches: {
    select: {
      id: true,
      date: true,
      result: true,
      details: true,
    },
  },
};

export class TournamentRepo implements Repo<Tournament, TournamentCreateDto> {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated tournaments repository');
  }

  async readAll(): Promise<Tournament[]> {
    return this.prisma.tournament.findMany({
      select,
    });
  }

  async readById(id: string): Promise<Tournament> {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
      select,
    });
    if (!tournament) {
      throw new HttpError(404, 'Not Found', `Tournament ${id} not found`);
    }

    return tournament;
  }

  async create(data: TournamentCreateDto): Promise<Tournament> {
    const newTournament = await this.prisma.tournament.create({
      data,
      select,
    });
    return newTournament;
  }

  async update(id: string, data: TournamentUpdateDto): Promise<Tournament> {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
    });
    if (!tournament) {
      throw new HttpError(404, 'Not Found', `Tournament ${id} not found`);
    }

    const updatedTournament = await this.prisma.tournament.update({
      where: { id },
      data,
      select,
    });

    return updatedTournament;
  }

  async delete(id: string): Promise<Tournament> {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
    });
    if (!tournament) {
      throw new HttpError(404, 'Not Found', `Tournament ${id} not found`);
    }

    return this.prisma.tournament.delete({
      where: { id },
      select,
    });
  }
}
