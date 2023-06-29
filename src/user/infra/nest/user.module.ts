import { Module } from '@nestjs/common';
import { AccountsController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { USER_PROVIDERS } from './user.providers';
import { UserInMemoryRepository, UserModel } from '../db';

@Module({
  imports: [],
  controllers: [AccountsController],
  providers: [
    {
      provide: 'UserInMemoryRepository',
      useClass: UserInMemoryRepository,
    },
    ...Object.values(USER_PROVIDERS.USE_CASES),
  ],
})
export class AccountsModule {}
