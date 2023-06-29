import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { USER_PROVIDERS } from './user.providers';
import { UserInMemoryRepository, UserModel } from '../db';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserInMemoryRepository',
      useClass: UserInMemoryRepository,
    },
    ...Object.values(USER_PROVIDERS.USE_CASES),
  ],
})
export class AccountsModule {}
