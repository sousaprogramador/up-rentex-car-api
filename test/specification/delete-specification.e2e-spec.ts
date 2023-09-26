import * as request from 'supertest';
import { SpecificationRepository } from '../../src/speficiation/domain/repository';
import { SPECIFICATION_PROVIDERS } from '../../src/speficiation/infra/nest/specification.providers';
import { Specification } from '../../src/speficiation/domain/entities';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';
import { NotFoundError } from '../../src/@seedwork/domain';

describe('SpecificationsController (e2e)', () => {
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
          .delete(`/specifications/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it('should delete a specification response with status 204', async () => {
      const specRepo = nestApp.app.get<SpecificationRepository.Repository>(
        SPECIFICATION_PROVIDERS.REPOSITORIES.SPECIFICATION_SEQUELIZE_REPOSITORY
          .provide,
      );
      const specification = Specification.fake().aSpecification().build();
      await specRepo.insert(specification);

      await request(nestApp.app.getHttpServer())
        .delete(`/specifications/${specification.id}`)
        .expect(204);

      await expect(specRepo.findById(specification.id)).rejects.toThrow(
        new NotFoundError(`Entity Not Found using ID ${specification.id}`),
      );
    });
  });
});
