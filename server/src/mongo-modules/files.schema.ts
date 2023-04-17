import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './users.schema';

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

  @Prop({default: Date.now()} )
  date: Date;
  
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'File' })
  parent: File;

  @Prop({type: [{ type: Types.ObjectId, ref: 'File' }]})
  childs: File[];
}

export const FileSchema = SchemaFactory.createForClass(File);
