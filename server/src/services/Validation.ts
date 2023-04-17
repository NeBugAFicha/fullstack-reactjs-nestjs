import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { GenericObject, RouteInterface } from '../Types';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: RouteInterface<ObjectSchema>) {}

  transform(routeParam: GenericObject, { type }: ArgumentMetadata) {
    if (!['param', 'query', 'body'].includes(type)) return routeParam;
    const { error, value } = this.schema[type].validate(routeParam);
    if (error) {
      throw new BadRequestException(
        JSON.stringify({ name: 'Validation Error', details: error.details }),
      );
    }
    return value;
  }
}
