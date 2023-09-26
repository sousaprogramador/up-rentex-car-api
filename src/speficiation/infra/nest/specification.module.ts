import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpecificationsController } from './specification.controller';
import { SPECIFICATION_PROVIDERS } from './specification.providers';
import { SpecificationModel } from '../db';

@Module({
  imports: [SequelizeModule.forFeature([SpecificationModel])],
  controllers: [SpecificationsController],
  providers: [
    SPECIFICATION_PROVIDERS.REPOSITORIES.SPECIFICATION_SEQUELIZE_REPOSITORY,
    ...Object.values(SPECIFICATION_PROVIDERS.USE_CASES),
  ],
})
export class SpecificationsModule {}
