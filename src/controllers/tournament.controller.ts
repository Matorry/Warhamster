
import createDebug from 'debug';
import { type NextFunction, type Request, type Response } from 'express';
import { Tournament, TournamentCreateDto, TournamentUpdateDto } from '../entities/tournament.js';
import { tournamentCreateDtoSchema, tournamentUpdateDtoSchema } from '../entities/tournament.schema.js';
import { TournamentParticipantCreateDto, TournamentParticipantUpdateDto } from '../entities/tournamentParticipant.js';
import { TournamentRepo } from '../repositories/tournament.repo.js';
import { TournamentParticipantRepo } from '../repositories/tournamentParticipant.repo.js';
import { BaseController } from './base.controller.js';

const debug = createDebug('TFD:users:controller');

export class TournamentController extends BaseController<Tournament, TournamentCreateDto, TournamentUpdateDto> {
  constructor(
    protected readonly repo: TournamentRepo,
    // eslint-disable-next-line no-unused-vars
    private readonly participantRepo: TournamentParticipantRepo
  ) {
    super(repo, tournamentCreateDtoSchema, tournamentUpdateDtoSchema);
    debug('Instantiated users controller');
  }

  async addParticipant(req: Request, res: Response, next: NextFunction) {
    const data: TournamentParticipantCreateDto = req.body;

    try {
      const result = await this.participantRepo.create(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateParticipant(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data: TournamentParticipantUpdateDto = req.body;

    try {
      const result = await this.participantRepo.update(id, data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeParticipant(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const result = await this.participantRepo.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

