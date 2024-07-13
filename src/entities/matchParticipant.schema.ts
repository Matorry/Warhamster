import Joi from 'joi';
import { type MatchParticipantCreateDto, type MatchParticipantUpdateDto } from './matchParticipant.js';

export const matchParticipantCreateDtoSchema = Joi.object<MatchParticipantCreateDto>({
  userId: Joi.string().required(),
  armyId: Joi.string().required(),
  matchId: Joi.string().required(),
});

export const matchParticipantUpdateDtoSchema = Joi.object<MatchParticipantUpdateDto>({
  userId: Joi.string().optional(),
  armyId: Joi.string().optional(),
  matchId: Joi.string().optional(),
}).min(1);
