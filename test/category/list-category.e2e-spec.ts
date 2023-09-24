import * as request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { CategoryRepository } from '../../src/category/domain/repository';
import { CATEGORY_PROVIDERS } from '../../src/category/infra/nest/category.providers';
import { ListCategoriesFixture } from '../../src/category/infra/nest/fixtures';
import { CategoriesController } from '../../src/category/infra/nest/category.controller';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';

describe('CategoriesController (e2e)', () => {
  describe('/categories (GET)', () => {
    describe('should return categories sorted by created_at when request query is empty', () => {
      //let categoryRepo: categoryRepository.Repository;
      const nestApp = startApp();
      const { entitiesMap, arrange } =
        ListCategoriesFixture.arrangeIncrementedWithCreatedAt();

      beforeEach(async () => {
        const categoryRepo = nestApp.app.get<CategoryRepository.Repository>(
          CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
        );
        await categoryRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when query params is $send_data',
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();
          return request(nestApp.app.getHttpServer())
            .get(`/categories/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                instanceToPlain(CategoriesController.userToResponse(e)),
              ),
              meta: expected.meta,
            });
        },
      );
    });

    describe('should return categories using paginate, filter and sort', () => {
      //let categoryRepo: categoryRepository.Repository;
      const nestApp = startApp();
      const { entitiesMap, arrange } = ListCategoriesFixture.arrangeUnsorted();

      beforeEach(async () => {
        const categoryRepo = nestApp.app.get<CategoryRepository.Repository>(
          CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
        );
        await categoryRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each([arrange[0]])(
        'when query params is $send_data',
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();
          return request(nestApp.app.getHttpServer())
            .get(`/categories/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                instanceToPlain(CategoriesController.userToResponse(e)),
              ),
              meta: expected.meta,
            });
        },
      );
    });
  });
});
