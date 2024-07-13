import { ArmyList } from "./armyList.js";
import { Match } from "./match.js";
import { User } from "./user.js";

export type MatchParticipant = {
  id: string;
  user: User;
  army: ArmyList;
  match: Match;
  createdAt: Date;
  updatedAt: Date;
};

export type MatchParticipantCreateDto = {
  userId: string;
  armyId: string;
  matchId: string;
};

export type MatchParticipantUpdateDto = {
  userId?: string;
  armyId?: string;
  matchId?: string;
};
