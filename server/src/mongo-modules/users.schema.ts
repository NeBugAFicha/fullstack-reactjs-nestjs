import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongo } from 'mongoose';
import { File } from './files.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  password: string;

  @Prop({ default: 1024 ** 3 * 10 })
  diskSpace: string;

  @Prop({ default: 0 })
  usedSpace: string;

  @Prop()
  avatar: string;

  // @Prop({ type: [{ type: SchemaMongo.Types.ObjectId, ref: 'File' }] })
  // files: File[];
}

export const UserSchema = SchemaFactory.createForClass(User);
