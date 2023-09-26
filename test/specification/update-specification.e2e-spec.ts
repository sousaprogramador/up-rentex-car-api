import * as request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { SpecificationRepository } from '../../src/speficiation/domain/repository';
import { SPECIFICATION_PROVIDERS } from '../../src/speficiation/infra/nest/specification.providers';
import { UpdateSpecificationFixture } from '../../src/speficiation/infra/nest/fixtures';
import { SpecificationsController } from '../../src/speficiation/infra/nest/specification.controller';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';
import { Specification } from '../../src/speficiation/domain/entities';

describe('SpecificationsController (e2e)', () => {
  const uuid = '9366b7dc-2d71-4799-b91c-c64adb205104';

  describe('/specifications/:id (PUT)', () => {
    describe('should a response error when id is invalid or not found', () => {
      const nestApp = startApp();
      const faker = Specification.fake().aSpecification();
      const arrange = [
        {
          id: '88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
          send_data: {
            name: faker.name,
            description: faker.description,
          },
          expected: {
            message:
              'Entity Not Found using ID 88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
            statusCode: 404,
            error: 'Not Found',
          },
        },
        {
          id: 'fake id',
          send_data: {
            name: faker.name,
            description: faker.description,
          },
          expected: {
            statusCode: 422,
            message: 'Validation failed (uuid is expected)',
            error: 'Unprocessable Entity',
          },
        },
      ];

      test.each(arrange)(
        'when id is $id',
        async ({ id, send_data, expected }) => {
          return request(nestApp.app.getHttpServer())
            .put(`/specifications/${id}`)
            .send(send_data)
            .expect(expected.statusCode)
            .expect(expected);
        },
      );
    });

    describe('should a response error with 422 when request body is invalid', () => {
      const app = startApp();
      const invalidRequest = UpdateSpecificationFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));
      test.each(arrange)('when body is $label', ({ value }) => {
        return request(app.app.getHttpServer())
          .put(`/specifications/${uuid}`)
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should a response error with 422 when throw EntityValidationError', () => {
      const app = startApp({
        beforeInit: (app) => {
          app['config'].globalPipes = [];
        },
      });
      const validationError =
        UpdateSpecificationFixture.arrangeForEntityValidationError();
      const arrange = Object.keys(validationError).map((key) => ({
        label: key,
        value: validationError[key],
      }));
      let spectRepo: SpecificationRepository.Repository;

      beforeEach(() => {
        spectRepo = app.app.get<SpecificationRepository.Repository>(
          SPECIFICATION_PROVIDERS.REPOSITORIES
            .SPECIFICATION_SEQUELIZE_REPOSITORY.provide,
        );
      });
      test.each(arrange)('when body is $label', async ({ value }) => {
        const specification = Specification.fake().aSpecification().build();
        await spectRepo.insert(specification);
        return request(app.app.getHttpServer())
          .put(`/specifications/${specification.id}`)
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should update a specification', () => {
      const app = startApp();
      const arrange = UpdateSpecificationFixture.arrangeForSave();
      let spectRepo: SpecificationRepository.Repository;

      beforeEach(async () => {
        spectRepo = app.app.get<SpecificationRepository.Repository>(
          SPECIFICATION_PROVIDERS.REPOSITORIES
            .SPECIFICATION_SEQUELIZE_REPOSITORY.provide,
        );
      });
      test.each(arrange)(
        'when body is $send_data',
        async ({ send_data, expected }) => {
          const specificationCrated = Specification.fake()
            .aSpecification()
            .build();
          await spectRepo.insert(specificationCrated);

          const res = await request(app.app.getHttpServer())
            .put(`/specifications/${specificationCrated.id}`)
            .send(send_data)
            .expect(200);
          const keyInResponse = UpdateSpecificationFixture.keysInResponse();
          expect(Object.keys(res.body)).toStrictEqual(['data']);
          expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);
          const id = res.body.data.id;
          const userUpdated = await spectRepo.findById(id);
          const presenter = SpecificationsController.userToResponse(
            userUpdated.toJSON(),
          );
          const serialized = instanceToPlain(presenter);
          expect(res.body.data).toStrictEqual(serialized);
          expect(res.body.data).toStrictEqual({
            id: serialized.id,
            created_at: serialized.created_at,
            ...expected,
          });
        },
      );
    });
  });
});
