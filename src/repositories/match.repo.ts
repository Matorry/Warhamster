import { Match, PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { MatchCreateDto, MatchUpdateDto } from '../entities/match.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { Repo } from './type.repo.js';

const debug = createDebug('TFD:matches:repository');

const select = {
  id: true,
  date: true,
  result: true,
  details: true,
  createdAt: true,
  updatedAt: true,
  tournamentId: false,
  tournament: {
    select: {
      id: true,
      name: true,
      startDate: true,
      endDate: true,
    },
  },
  participants: {
    select: {
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
          subFaction: true,
        },
      },
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

  async createMany(matches: MatchCreateDto[]): Promise<Match[]> {
    const createdMatches = await this.prisma.$transaction(
      matches.map(match => this.prisma.match.create({ data: match, select }))
    );
    return createdMatches;
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

  async readByParticipant(participantId: string): Promise<Match[]> {
    const matches = await this.prisma.match.findMany({
      where: {
        participants: {
          some: {
            userId: participantId,
          },
        },
      },
      select,
    });

    if (!matches) {
      throw new HttpError(404, 'Not Found', `Matches for participant ${participantId} not found`);
    }

    return matches;
  }
}
