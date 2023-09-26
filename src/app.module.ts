import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { seedworkModule } from './@seedwork/infra/nest/@seedwork.module';
import { UsersModule } from './user/infra/nest/user.module';
import { AuthModule } from './auth/infra/nest/auth.module';
import { CategoriesModule } from './category/infra';
import { SpecificationsModule } from './speficiation/infra';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    seedworkModule,
    DatabaseModule,
    CategoriesModule,
    SpecificationsModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
