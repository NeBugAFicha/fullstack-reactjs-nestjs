import * as Joi from 'joi';
import { SchemaType } from '../../Types';
import { Type } from './file.type';

export const Schema: SchemaType<Type> = {
  createDir: {
    body: Joi.object().keys({
      name: Joi.string().min(1).max(50).required().description('Имя файла'),
      type: Joi.string().min(8).max(16).description('Тип файла'),
      parent: Joi.string()
        .min(1)
        .max(50)
        .description('Имя родительского файла'),
    }),
  },
};
