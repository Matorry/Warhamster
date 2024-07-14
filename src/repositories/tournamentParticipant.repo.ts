import { PrismaClient, TournamentParticipant } from '@prisma/client';
import createDebug from 'debug';
import { TournamentParticipantCreateDto, TournamentParticipantUpdateDto } from '../entities/tournamentParticipant.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { Repo } from './type.repo.js';

const debug = createDebug('TFD:tournamentParticipant:repository');

const select = {
  id: true,
  user: {
    select: {
      id: true,
      userName: true,
      email: true,
    },
  },
  armyList: {
    select: {
      id: true,
      name: true,
      faction: true,
    },
  },
  tournament: {
    select: {
      id: true,
      name: true,
      startDate: true,
      endDate: true,
    },
  },
  createdAt: true,
  updatedAt: true,
  userId: false,
  armyListId: false,
  tournamentId: false
};

export class TournamentParticipantRepo implements Repo<TournamentParticipant, TournamentParticipantCreateDto> {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated matchParticipant repository');
  }

  async readAll() {
    return this.prisma.tournamentParticipant.findMany({
      select,
    });
  }

  async readById(id: string) {
    const participant = await this.prisma.tournamentParticipant.findUnique({
      where: { id },
      select,
    });
    if (!participant) {
      throw new HttpError(404, 'Not Found', `TournamentParticipant ${id} not found`);
    }

    return participant;
  }

  async create(data: TournamentParticipantCreateDto) {
    const newParticipant = this.prisma.tournamentParticipant.create({
      data,
      select,
    });
    return newParticipant;
  }

  async update(id: string, data: TournamentParticipantUpdateDto) {
    const participant = await this.prisma.tournamentParticipant.findUnique({
      where: { id },
    });
    if (!participant) {
      throw new HttpError(404, 'Not Found', `TournamentParticipant ${id} not found`);
    }

    const updatedParticipant = this.prisma.tournamentParticipant.update({
      where: { id },
      data,
      select,
    });
    return updatedParticipant;
  }

  async delete(id: string) {
    const participant = await this.prisma.tournamentParticipant.findUnique({
      where: { id },
    });
    if (!participant) {
      throw new HttpError(404, 'Not Found', `TournamentParticipant ${id} not found`);
    }

    return this.prisma.tournamentParticipant.delete({
      where: { id },
      select,
    });
  }
}
