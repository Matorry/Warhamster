import { ArmyList } from "./armyList.js";
import { Tournament } from "./tournament.js";
import { User } from "./user.js";

export type TournamentParticipant = {
  id: string;
  user: User;
  armyList?: ArmyList;
  tournament: Tournament;
  createdAt: Date;
  updatedAt: Date;
};

export type TournamentParticipantCreateDto = {
  userId: string;
  armyListId: string;
  tournamentId: string;
};

export type TournamentParticipantUpdateDto = {
  userId?: string;
  armyListId?: string;
  tournamentId?: string;
};
