import {
  Controller,
  Post,
  UsePipes,
  Headers,
  Body,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { JoiValidationPipe } from '../../services/Validation';
import { Schema } from './auth.schema';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Type } from './auth.type';
import { AuthGuard } from 'src/services/Guard';
import { FileService } from '../file/file.service';
import { File } from 'src/mongo-modules/files.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService,
    @InjectModel(File.name) private fileModel: Model<File>,
  ) {}

  @Post('registration')
  @UsePipes(new JoiValidationPipe(Schema['registration']))
  async registration(
    @Headers('user_id') current_user_id: number,
    @Body() body: Type['registration']['body'],
  ) {
    const { email, password } = body;
    const hashPassword = await bcrypt.hash(password, 3);

    const result = await this.authService.create({
      email,
      password: hashPassword,
    });
    console.log('here', result);
    await this.fileService.createDir(
      new this.fileModel({ user: result, name: '' }),
    );
    console.log('here');
    return {
      token: jwt.sign(result.toJSON(), process.env.JWT_SECRET_KEY),
      user: result,
    };
  }

  @Post('login')
  @UsePipes(new JoiValidationPipe(Schema['logIn']))
  async logIn(
    @Headers('user_id') current_user_id: number,
    @Body() body: Type['logIn']['body'],
  ) {
    const { email, password } = body;
    const result = await this.authService.find({ email });

    const isPassEquals = await bcrypt.compare(password, result.password);

    if (!isPassEquals) {
      throw new ForbiddenException('Incorrect password');
    }
    const token = jwt.sign(result.toJSON(), process.env.JWT_SECRET_KEY);

    return { message: 'Valid credentials', token, user: result };
  }

  @Post('auth')
  @UseGuards(AuthGuard)
  @UsePipes(new JoiValidationPipe(Schema['auth']))
  async auth(@Headers('user_id') current_user_id: number) {
    const result = await this.authService.findById({ id: current_user_id });

    const token = jwt.sign(result.toJSON(), process.env.JWT_SECRET_KEY);

    return { token, user: result };
  }
}
