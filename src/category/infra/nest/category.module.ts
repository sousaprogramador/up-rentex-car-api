import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesController } from './category.controller';
import { CATEGORY_PROVIDERS } from './category.providers';
import { CategoryModel } from '../db';

@Module({
  imports: [SequelizeModule.forFeature([CategoryModel])],
  controllers: [CategoriesController],
  providers: [
    CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_SEQUELIZE_REPOSITORY,
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ],
})
export class CategoriesModule {}
