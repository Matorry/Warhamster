import Joi from 'joi';
import { type TournamentCreateDto, type TournamentUpdateDto } from './tournament.js';

export const tournamentCreateDtoSchema = Joi.object<TournamentCreateDto>({
  name: Joi.string().required(),
  description: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  result: Joi.string().required(),
  details: Joi.string().required(),
});

export const tournamentUpdateDtoSchema = Joi.object<TournamentUpdateDto>({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  result: Joi.string().optional(),
  details: Joi.string().optional(),
}).min(1);
