import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/infra/nest/accounts.module';
import { seedworkModule } from './@seedwork/infra/nest/@seedwork.module';

@Module({
  imports: [AccountsModule, seedworkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
