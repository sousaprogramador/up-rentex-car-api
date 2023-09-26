import * as request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { SpecificationRepository } from '../../src/speficiation/domain/repository';
import { SPECIFICATION_PROVIDERS } from '../../src/speficiation/infra/nest/specification.providers';
import { CreateSpecificationFixture } from '../../src/speficiation/infra/nest/fixtures';
import { SpecificationsController } from '../../src/speficiation/infra/nest/specification.controller';
import { Specification } from '../../src/speficiation/domain/entities';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';

describe('SpecificationsController (e2e)', () => {
  const nestApp = startApp();
  describe('/specifications/:id (GET)', () => {
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
          .get(`/specifications/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it('should return a user ', async () => {
      const specRepo = nestApp.app.get<SpecificationRepository.Repository>(
        SPECIFICATION_PROVIDERS.REPOSITORIES.SPECIFICATION_SEQUELIZE_REPOSITORY
          .provide,
      );
      const user = Specification.fake().aSpecification().build();
      specRepo.insert(user);

      const res = await request(nestApp.app.getHttpServer())
        .get(`/specifications/${user.id}`)
        .expect(200);
      const keyInResponse = CreateSpecificationFixture.keysInResponse();
      expect(Object.keys(res.body)).toStrictEqual(['data']);
      expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);

      const presenter = SpecificationsController.userToResponse(user.toJSON());
      const serialized = instanceToPlain(presenter);
      expect(res.body.data).toStrictEqual(serialized);
    });
  });
});
