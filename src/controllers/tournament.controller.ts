
import createDebug from 'debug';
import { type NextFunction, type Request, type Response } from 'express';
import { Tournament, TournamentCreateDto, TournamentUpdateDto } from '../entities/tournament.js';
import { tournamentCreateDtoSchema, tournamentUpdateDtoSchema } from '../entities/tournament.schema.js';
import { TournamentParticipantCreateDto, TournamentParticipantUpdateDto } from '../entities/tournamentParticipant.js';
import { TournamentRepo } from '../repositories/tournament.repo.js';
import { TournamentParticipantRepo } from '../repositories/tournamentParticipant.repo.js';
import { RoundRobinService } from '../services/roundRobin.service.js';
import { BaseController } from './base.controller.js';

const debug = createDebug('TFD:users:controller');

export class TournamentController extends BaseController<Tournament, TournamentCreateDto, TournamentUpdateDto> {
  private static instance: TournamentController;

  private constructor(
    protected readonly repo: TournamentRepo,
    // eslint-disable-next-line no-unused-vars
    private readonly participantRepo: TournamentParticipantRepo,
    // eslint-disable-next-line no-unused-vars
    private readonly roundRobinService: RoundRobinService
  ) {
    super(repo, tournamentCreateDtoSchema, tournamentUpdateDtoSchema);
    debug('Instantiated tournament controller');
  }

  static getInstance(repo: TournamentRepo, participantRepo: TournamentParticipantRepo, roundRobinService: RoundRobinService) {
    if (!TournamentController.instance) {
      TournamentController.instance = new TournamentController(repo, participantRepo, roundRobinService);
    }

    return TournamentController.instance;
  }

  async addParticipant(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { userId, armyListId } = req.body
    const data: TournamentParticipantCreateDto = { userId, armyListId, tournamentId: id };

    try {
      const result = await this.participantRepo.create(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateParticipant(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { payload, ...data } = req.body;
    const updateData: TournamentParticipantUpdateDto = data;

    try {
      const result = await this.participantRepo.update(id, updateData);
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

  async createRoundRobinMatches(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const matches = await this.roundRobinService.createRoundRobinMatches(id);
      res.status(201).json(matches);
    } catch (error) {
      next(error);
    }
  }
}

