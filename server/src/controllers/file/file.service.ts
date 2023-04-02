import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import { File } from 'src/mongo-modules/files.schema';
import path from 'path';
@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<File>) {}

  createDir(file: File) {
    console.log(file);
    const filePath = path.join(
      __dirname,
      `../../files/${file.user}/${file.path}`,
    );
    return new Promise((res, rej) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
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
}
