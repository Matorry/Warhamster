import { PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { Tournament, TournamentCreateDto, TournamentUpdateDto } from '../entities/tournament.js';
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
      createdAt: false,
      updatedAt: false,
      user: {
        select: {
          id: true,
          userName: true,
          email: true,
          role: false,
          birthDate: false
        },
      },
      armyList: {
        select: {
          id: true,
          name: true,
          faction: true,
          subFaction: true,
          roster: true,
          createdAt: false,
          updatedAt: false
        },
      },
    },
  },
  matches: {
    select: {
      id: true,
      date: true,
      result: true,
      details: true,
      createdAt: false,
      updatedAt: false
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

  async readByParticipant(participantId: string): Promise<Tournament[]> {
    const tournaments = await this.prisma.tournament.findMany({
      where: {
        participants: {
          some: {
            user: {
              id: participantId
            }
          },
        },
      },
      select,
    });

    if (!tournaments) {
      throw new HttpError(404, 'Not Found', `Tournaments for participant ${participantId} not found`);
    }

    return tournaments;
  }
}
