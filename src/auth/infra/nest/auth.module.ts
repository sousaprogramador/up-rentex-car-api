import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AUTH_PROVIDERS } from './auth.provider';
import { UserModel } from '../../../user/infra/db';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [AuthController],
  providers: [
    AUTH_PROVIDERS.REPOSITORIES.AUTH_SEQUELIZE_REPOSITORY,
    ...Object.values(AUTH_PROVIDERS.USE_CASES),
  ],
})
export class AuthModule {}
