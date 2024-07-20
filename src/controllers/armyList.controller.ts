
import { ArmyList } from '@prisma/client';
import createDebug from 'debug';
import { type NextFunction, type Request, type Response } from 'express';
import { type ArmyListCreateDto, type ArmyListUpdateDto } from '../entities/armyList.js';
import { armyListCreateDtoSchema, armyListUpdateDtoSchema } from '../entities/armyList.schema.js';
import { type ArmyListRepo } from '../repositories/armyList.repo.js';
import { BaseController } from './base.controller.js';
const debug = createDebug('TFD:users:controller');

export class ArmyListController extends BaseController<ArmyList, ArmyListCreateDto, ArmyListUpdateDto> {
  private static instance: ArmyListController;

  private constructor(protected readonly repo: ArmyListRepo) {
    super(repo, armyListCreateDtoSchema, armyListUpdateDtoSchema);
    debug('Instantiated army list controller');
  }

  static getInstance(repo: ArmyListRepo) {
    if (!ArmyListController.instance) {
      ArmyListController.instance = new ArmyListController(repo);
    }

    return ArmyListController.instance;
  }

  async readByOwner(req: Request, res: Response, next: NextFunction) {
    try {
      const { ownerId } = req.params;

      if (ownerId === undefined) {
        return res.status(400).json({ error: 'userId parameter is missing' });
      }

      const armyLists = await this.repo.readByOwner(ownerId)
      res.json(armyLists)
    } catch (error) {
      next(error);
    }

  }
}
