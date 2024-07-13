import { MatchParticipant } from "./matchParticipant.js";
import { User } from "./user.js";

export type ArmyList = {
  id: string;
  name: string;
  roster: string;
  faction: string;
  subFaction: string;
  owner?: User;
  armyMatchLists?: MatchParticipant[];
  createdAt: Date;
  updatedAt: Date;
};

export type ArmyListCreateDto = {
  name: string;
  roster: string;
  faction: string;
  subFaction: string;
  ownerId: string;
};

export type ArmyListUpdateDto = {
  name?: string;
  roster?: string;
  faction?: string;
  subFaction?: string;
};
