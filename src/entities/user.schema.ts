import Joi from 'joi';
import { type UserCreateDto, type UserUpdateDto } from './user.js';

export const userCreateDtoSchema = Joi.object<UserCreateDto>({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  pswd: Joi.string().required(),
  role: Joi.string().valid('admin', 'user').required(),
  birthDate: Joi.date().required(),
});

export const userUpdateDtoSchema = Joi.object<UserUpdateDto>({
  userName: Joi.string().optional(),
  email: Joi.string().optional(),
  pswd: Joi.string().optional(),
  birthDate: Joi.date().optional(),
}).min(1);
