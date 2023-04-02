import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { AuthModule } from './controllers/auth/auth.module';
import { HttpExceptionFilter } from './services/Exceptions';
import { TransformInterceptor } from './services/Interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './controllers/file/file.module';

@Module({
  imports: [
    AuthModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'files',
            module: FileModule,
          },
        ],
      },
    ]),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    FileModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
