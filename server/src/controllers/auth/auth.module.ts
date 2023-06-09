import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../mongo-modules/users.schema';
import { FileModule } from '../file/file.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService,     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class AuthModule {}
