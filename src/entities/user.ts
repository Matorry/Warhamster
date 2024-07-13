import { ArmyList } from "./armyList.js";

export type User = {
  id: string;
  userName: string;
  email: string;
  pswd?: string;
  role: 'admin' | 'user';
  birthDate: Date;
  armyLists?: ArmyList[];
};

export type UserCreateDto = {
  userName: string;
  email: string;
  pswd: string;
  role: 'admin' | 'user';
  birthDate: Date;
};

export type UserUpdateDto = {
  userName?: string;
  email?: string;
  pswd?: string;
  birthDate?: Date;
};
