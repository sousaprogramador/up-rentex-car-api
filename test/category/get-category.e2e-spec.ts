import * as request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { CategoryRepository } from '../../src/category/domain/repository';
import { CATEGORY_PROVIDERS } from '../../src/category/infra/nest/category.providers';
import { CreateCategoryFixture } from '../../src/category/infra/nest/fixtures';
import { CategoriesController } from '../../src/category/infra/nest/category.controller';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';
import { Category } from '../../src/category/domain';

describe('CategoriesController (e2e)', () => {
  const nestApp = startApp();
  describe('/categories/:id (GET)', () => {
    describe('should a response error when id is invalid or not found', () => {
      const arrange = [
        {
          id: '88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
          expected: {
            message:
              'Entity Not Found using ID 88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
            statusCode: 404,
            error: 'Not Found',
          },
        },
        {
          id: 'fake id',
          expected: {
            statusCode: 422,
            message: 'Validation failed (uuid is expected)',
            error: 'Unprocessable Entity',
          },
        },
      ];

      test.each(arrange)('when id is $id', async ({ id, expected }) => {
        return request(nestApp.app.getHttpServer())
          .get(`/categories/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it('should return a user ', async () => {
      const categoryRepo = nestApp.app.get<CategoryRepository.Repository>(
        CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );
      const user = Category.fake().aCategory().build();
      categoryRepo.insert(user);

      const res = await request(nestApp.app.getHttpServer())
        .get(`/categories/${user.id}`)
        .expect(200);
      const keyInResponse = CreateCategoryFixture.keysInResponse();
      expect(Object.keys(res.body)).toStrictEqual(['data']);
      expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);

      const presenter = CategoriesController.userToResponse(user.toJSON());
      const serialized = instanceToPlain(presenter);
      expect(res.body.data).toStrictEqual(serialized);
    });
  });
});
