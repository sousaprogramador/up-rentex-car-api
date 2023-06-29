import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { USER_PROVIDERS } from './accounts.providers';

@Module({
  imports: [],
  controllers: [AccountsController],
  providers: [
    ...Object.values(USER_PROVIDERS.REPOSITORIES),
    ...Object.values(USER_PROVIDERS.USE_CASES),
  ],
})
export class AccountsModule {}
