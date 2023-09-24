import * as request from 'supertest';
import { CategoryRepository } from '../../src/category/domain/repository';
import { CATEGORY_PROVIDERS } from '../../src/category/infra/nest/category.providers';
import { Category } from '../../src/category/domain/entities';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';
import { NotFoundError } from '../../src/@seedwork/domain';

describe('CategoriesController (e2e)', () => {
  describe('/delete/:id (DELETE)', () => {
    const nestApp = startApp();
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
            message: 'Validation failed (uuid is expected)',
            error: 'Unprocessable Entity',
            statusCode: 422,
          },
        },
      ];

      test.each(arrange)('when id is $id', async ({ id, expected }) => {
        return request(nestApp.app.getHttpServer())
          .delete(`/categories/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it('should delete a category response with status 204', async () => {
      const categoryRepo = nestApp.app.get<CategoryRepository.Repository>(
        CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );
      const category = Category.fake().aCategory().build();
      await categoryRepo.insert(category);

      await request(nestApp.app.getHttpServer())
        .delete(`/categories/${category.id}`)
        .expect(204);

      await expect(categoryRepo.findById(category.id)).rejects.toThrow(
        new NotFoundError(`Entity Not Found using ID ${category.id}`),
      );
    });
  });
});
