import { MatchParticipant } from "./matchParticipant.js";
import { Tournament } from "./tournament.js";

export type Match = {
  id: string;
  date: Date;
  result: string;
  details: string;
  participants?: MatchParticipant[];
  tournament?: Tournament;
  createdAt: Date;
  updatedAt: Date;
};

export type MatchCreateDto = {
  date: Date;
  result: string;
  details: string;
  tournamentId?: string;
};

export type MatchUpdateDto = {
  date?: Date;
  result?: string;
  details?: string;
  tournamentId?: string;
};
