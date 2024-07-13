import Joi from 'joi';
import { type MatchCreateDto, type MatchUpdateDto } from './match.js';

export const matchCreateDtoSchema = Joi.object<MatchCreateDto>({
  date: Joi.date().required(),
  result: Joi.string().required(),
  details: Joi.string().required(),
  tournamentId: Joi.string().optional(),
});

export const matchUpdateDtoSchema = Joi.object<MatchUpdateDto>({
  date: Joi.date().optional(),
  result: Joi.string().optional(),
  details: Joi.string().optional(),
  tournamentId: Joi.string().optional(),
}).min(1);
