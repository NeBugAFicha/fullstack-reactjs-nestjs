import {
  Body, Controller, ForbiddenException, Headers, Post, UseGuards, UsePipes
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from 'src/services/Guard';
import { JoiValidationPipe } from '../../services/Validation';
import { FileService } from '../file/file.service';
import { Schema } from './auth.schema';
import { AuthService } from './auth.service';
import { Type } from './auth.type';
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService
  ) {}

  @Post('registration')
  @UsePipes(new JoiValidationPipe(Schema['registration']))
  async registration(
    @Headers('user_id') current_user_id: string,
    @Body() body: Type['registration']['body'],
  ) {
    const { email, password } = body;
    const hashPassword = await bcrypt.hash(password, 3);

    const result = await this.authService.create({
      email,
      password: hashPassword,
    });

    await this.fileService.createDir(
      this.fileService.createFile({ user: result._id.toString(), name: '' }),
    );

    return {
      token: jwt.sign(result.toJSON(), process.env.JWT_SECRET_KEY),
      user: result,
    };
  }

  @Post('login')
  @UsePipes(new JoiValidationPipe(Schema['logIn']))
  async logIn(
    @Headers('user_id') current_user_id: string,
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
  async auth(@Headers('user_id') current_user_id: string) {
    const result = await this.authService.findById({ id: current_user_id });

    const token = jwt.sign(result.toJSON(), process.env.JWT_SECRET_KEY);

    return { token, user: result };
  }
}
