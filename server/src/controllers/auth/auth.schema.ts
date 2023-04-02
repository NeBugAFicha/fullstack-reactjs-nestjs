import * as Joi from 'joi';
import { SchemaType } from '../../Types';
import { Type } from './auth.type';

export const Schema: SchemaType<Type> = {
  registration: {
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .min(1)
        .max(50)
        .required()
        .description('E-mail пользователя'),
      password: Joi.string()
        .min(8)
        .max(16)
        .required()
        .description('Пароль пользователя'),
    }),
  },
  logIn: {
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .min(1)
        .max(50)
        .required()
        .description('E-mail пользователя'),
      password: Joi.string()
        .min(8)
        .max(16)
        .required()
        .description('Пароль пользователя'),
    }),
  },
  auth: {},
};
