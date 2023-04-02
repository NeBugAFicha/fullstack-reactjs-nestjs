import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
  Schema as SchemaMongo,
  SchemaTypes,
  Types,
} from 'mongoose';
import { User } from './users.schema';

export type FileDocument = HydratedDocument<File>;

@Schema()
export class File {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 'dir' })
  type: string;

  @Prop()
  accessLink: string;

  @Prop({ default: 0 })
  size: number;

  @Prop({ default: '' })
  path: string;

  @Prop({ type: { type: SchemaTypes.ObjectId, ref: User.name } })
  user: Types.ObjectId;

  @Prop({ type: { type: SchemaMongo.Types.ObjectId, ref: 'File' } })
  parent: File;

  @Prop({ type: [{ type: SchemaMongo.Types.ObjectId, ref: 'File' }] })
  childs: File[];
}

export const FileSchema = SchemaFactory.createForClass(File);
