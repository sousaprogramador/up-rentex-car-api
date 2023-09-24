import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/infra/nest/user.module';
import { AuthModule } from './auth/infra/nest/auth.module';
import { CategoriesModule } from './category/infra';
import { seedworkModule } from './@seedwork/infra/nest/@seedwork.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    seedworkModule,
    DatabaseModule,
    CategoriesModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
