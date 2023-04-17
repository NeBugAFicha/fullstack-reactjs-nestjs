import {
  Body, Controller, Get, Headers, Post, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { AuthGuard } from 'src/services/Guard';
import { JoiValidationPipe } from 'src/services/Validation';
import { AuthService } from '../auth/auth.service';
import { Schema } from './file.schema';
import { FileService } from './file.service';
import { Type } from './file.type';

@Controller()
@UseGuards(AuthGuard)
export class FileController{
  constructor(private readonly fileService: FileService,
    private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(Schema['createDir']))
  async createDir(
    @Headers('user_id') current_user_id: string,
    @Body() body: Type['createDir']['body'],
  ) {
    const { name, type, parent } = body;
    const file = this.fileService.createFile({
      name,
      type,
      parent,
      user: current_user_id,
    });

    const parentFile =
      parent && (await this.fileService.findById({ id: parent }));
    const user = await this.authService.findById({id: current_user_id});
    if (!parentFile) {
      file.path = name;
      await this.fileService.createDir(file);
    } else {
      file.path = `${parentFile.path}/${name}`;
      await this.fileService.createDir(file);
      parentFile.childs.push(file);
      await parentFile.save();
    }
    user.files.push(file);
    await user.save();

    await file.save();
    return file;
  }

  @Get()
  @UsePipes(new JoiValidationPipe(Schema['getFiles']))
  async getFiles(
    @Headers('user_id') current_user_id: string,
    @Query() query: Type['getFiles']['query'],
  ) {
    const { parent } = query;

    const files = await this.fileService.find({
      user: current_user_id,
      parent,
    });

    return files;
  }

  @Post('save')
  @UsePipes(new JoiValidationPipe(Schema['saveFile']))
  @UseInterceptors(FileInterceptor('file'))
  async saveFile(
    @Headers('user_id') current_user_id: string,
    @Body() body: Type['saveFile']['body'],
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(file);
    // file.
    // file.mv(path.join(
    //       __dirname,
    //       `../../../files`,
    // ))
    // const parent = await this.fileService.find({user: current_user_id, id: body.parent});
    // const user = await this.authService.findById({id: current_user_id});
    // console.log(parent, user);
    // if(user.usedSpace + file.size > user.diskSpace) {
    //   throw new BadRequestException('There is no space on the disk');
    // }

    // user.usedSpace += file.size;

    // let diskFilePath, filePath;
    // if(parent) {
    //   diskFilePath = path.join(
    //     __dirname,
    //     `../../../files/${user._id.toString()}/${parent.path}/${file.originalname}`,
    //   );
    //   filePath = `${parent.path}/${file.originalname}`;
    // } else {
    //   diskFilePath = path.join(
    //     __dirname,
    //     `../../../files/${user._id.toString()}/${file.originalname}`,
    //   );
    //   filePath = file.originalname;
    // }

    // if(fs.existsSync(diskFilePath)){
    //   throw new BadRequestException('File already exists');
    // }

    // file.mv(diskFilePath);

    // const type = file.originalname.split('.').pop();
    // const dbFile = this.fileService.createFile({
    //   name: file.originalname,
    //   type,
    //   size: file.size,
    //   path: filePath,
    //   parent: parent._id,
    //   user: user._id
    // });

    // await dbFile.save();
    // await user.save();
    // return dbFile;
    return {};
  }
}
