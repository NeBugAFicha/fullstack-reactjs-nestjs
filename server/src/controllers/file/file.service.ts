import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model, Types } from 'mongoose';
import { File } from 'src/mongo-modules/files.schema';
import * as path from 'path';
@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<File>) {}

  createFile(fields: {
    name: string;
    type?: string;
    parent?: string;
    user: string;
  }) {

    return new this.fileModel({
      ...fields,
      user: new Types.ObjectId(fields.user),
    });
  }
  createDir(file: File) {
    const filePath = path.join(
      __dirname,
      `../../../files/${file.user.toString()}/${file.path}`,
    );

    return new Promise((res, rej) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
          return res('File was created');
        }
        rej({ message: 'File already exist' });
      } catch (e) {
        rej({ message: 'File Error' });
      }
    });
  }

  findById(where: { id: string }) {
    return this.fileModel.findById({ _id: where.id });
  }

  find(where: { user?: string; parent?: string; id?: string }) {
    return this.fileModel.findOne({
      ...where,
      _id: new Types.ObjectId(where.id),
      user: new Types.ObjectId(where.user),
    });
  }
}
