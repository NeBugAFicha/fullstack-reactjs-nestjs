import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../mongo-modules/users.schema';
import { FileModule } from '../file/file.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FileModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
