import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TaskUserModule } from '../task-user/task-user.module';
import { TaskUserService } from '../task-user/task-user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig, RABBITMQ_SERVICE } from '../../config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions, JwtAccessStrategy, JwtConfig, JwtRefreshStrategy } from '@taskforce/core';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from '../../config/multer.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TaskUserService, JwtAccessStrategy, JwtRefreshStrategy, JwtConfig],
  imports: [
    TaskUserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: getJwtOptions,
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
    MulterModule.registerAsync({
      useFactory: getMulterConfig,
      inject: [ConfigService],
    }),
  ]
})
export class AuthModule {}
