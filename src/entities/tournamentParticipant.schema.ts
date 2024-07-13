import Joi from 'joi';
import { type TournamentParticipantCreateDto, type TournamentParticipantUpdateDto } from './tournamentParticipant.js';

export const tournamentParticipantCreateDtoSchema = Joi.object<TournamentParticipantCreateDto>({
  userId: Joi.string().required(),
  armyListId: Joi.string().required(),
  tournamentId: Joi.string().required(),
});

export const tournamentParticipantUpdateDtoSchema = Joi.object<TournamentParticipantUpdateDto>({
  userId: Joi.string().optional(),
  armyListId: Joi.string().optional(),
  tournamentId: Joi.string().optional(),
}).min(1);
