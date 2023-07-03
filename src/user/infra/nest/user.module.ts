import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { USER_PROVIDERS } from './user.providers';
import { UserModel } from '../db';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [
    USER_PROVIDERS.REPOSITORIES.USER_SEQUELIZE_REPOSITORY,
    ...Object.values(USER_PROVIDERS.USE_CASES),
  ],
})
export class UsersModule {}
