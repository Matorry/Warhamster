import { Match } from "./match.js";
import { TournamentParticipant } from "./tournamentParticipant.js";

export type Tournament = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  result: string;
  details: string;
  participants?: TournamentParticipant[];
  matches?: Match[];
  createdAt: Date;
  updatedAt: Date;
};

export type TournamentCreateDto = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  result: string;
  details: string;
};

export type TournamentUpdateDto = {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  result?: string;
  details?: string;
};
