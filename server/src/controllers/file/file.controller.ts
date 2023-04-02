import {
  Controller,
  UseGuards,
  Post,
  UsePipes,
  Headers,
  Body,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from 'src/mongo-modules/files.schema';
import { AuthGuard } from 'src/services/Guard';
import { JoiValidationPipe } from 'src/services/Validation';
import { Schema } from './file.schema';
import { FileService } from './file.service';
import { Type } from './file.type';
import { HydratedDocument, Types } from 'mongoose';

@Controller()
@UseGuards(AuthGuard)
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @InjectModel(File.name) private fileModel: Model<File>,
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe(Schema['createDir']))
  async createDir(
    @Headers('user_id') current_user_id: number,
    @Body() body: Type['createDir']['body'],
  ) {
    const { name, type, parent } = body;
    const file = new this.fileModel({
      name,
      type,
      parent,
      user: new Types.ObjectId(current_user_id),
    });
    console.log('here2', current_user_id);
    console.log(file);
    const parentFile =
      parent && (await this.fileService.findById({ id: parent }));
    if (!parentFile) {
      file.path = name;
      await this.fileService.createDir(file);
    } else {
      file.path = `${parentFile.name}\\${name}`;
      await this.fileService.createDir(file);
      parentFile.childs.push(file);
      await parentFile.save();
    }
    await file.save();
    return {
      file,
    };
  }
}
