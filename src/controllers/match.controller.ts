import createDebug from 'debug';
import { type NextFunction, type Request, type Response } from 'express';
import { Match, MatchCreateDto, MatchUpdateDto } from '../entities/match.js';
import { matchCreateDtoSchema, matchUpdateDtoSchema } from '../entities/match.schema.js';
import { MatchParticipantCreateDto, MatchParticipantUpdateDto } from '../entities/matchParticipant.js';
import { MatchRepo } from '../repositories/match.repo.js';
import { MatchParticipantRepo } from '../repositories/matchParticipant.repo.js';
import { BaseController } from './base.controller.js';

const debug = createDebug('TFD:match:controller');

export class MatchController extends BaseController<Match, MatchCreateDto, MatchUpdateDto> {
  private static instance: MatchController;

  private constructor(
    protected readonly repo: MatchRepo,
    // eslint-disable-next-line no-unused-vars
    private readonly participantRepo: MatchParticipantRepo
  ) {
    super(repo, matchCreateDtoSchema, matchUpdateDtoSchema);
    debug('Instantiated match controller');
  }

  static getInstance(repo: MatchRepo, participantRepo: MatchParticipantRepo) {
    if (!MatchController.instance) {
      MatchController.instance = new MatchController(repo, participantRepo);
    }

    return MatchController.instance;
  }

  async readByParticipant(req: Request, res: Response, next: NextFunction) {
    try {
      const { participantId } = req.params;

      if (participantId === undefined) {
        return res.status(400).json({ error: 'userId parameter is missing' });
      }

      const armyLists = await this.repo.readByParticipant(participantId)
      res.json(armyLists)
    } catch (error) {
      next(error);
    }

  }

  async addParticipant(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { userId, armyId } = req.body
    const data: MatchParticipantCreateDto = { userId, armyId, matchId: id };

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
    const updateData: MatchParticipantUpdateDto = data;

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
}
