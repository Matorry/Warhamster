import Joi from 'joi';
import { type ArmyListCreateDto, type ArmyListUpdateDto } from './armyList.js';

export const armyListCreateDtoSchema = Joi.object<ArmyListCreateDto>({
  name: Joi.string().required(),
  roster: Joi.string().required(),
  faction: Joi.string().required(),
  subFaction: Joi.string().required(),
  ownerId: Joi.string().required(),
});

export const armyListUpdateDtoSchema = Joi.object<ArmyListUpdateDto>({
  name: Joi.string().optional(),
  roster: Joi.string().optional(),
  faction: Joi.string().optional(),
  subFaction: Joi.string().optional(),
}).min(1);
