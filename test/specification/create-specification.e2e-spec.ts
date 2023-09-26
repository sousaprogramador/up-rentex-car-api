import * as request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { SpecificationRepository } from '../../src/speficiation/domain/repository';
import { SPECIFICATION_PROVIDERS } from '../../src/speficiation/infra/nest/specification.providers';
import { CreateSpecificationFixture } from '../../src/speficiation/infra/nest/fixtures';
import { SpecificationsController } from '../../src/speficiation/infra/nest/specification.controller';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';

describe('SpecificationsController (e2e)', () => {
  describe('/specifications (POST)', () => {
    describe('should a response error with 422 when request body is invalid', () => {
      const app = startApp();
      const invalidRequest = CreateSpecificationFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));
      test.each(arrange)('when body is $label', ({ value }) => {
        return request(app.app.getHttpServer())
          .post('/specifications')
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
        CreateSpecificationFixture.arrangeForEntityValidationError();
      const arrange = Object.keys(validationError).map((key) => ({
        label: key,
        value: validationError[key],
      }));
      test.each(arrange)('when body is $label', ({ value }) => {
        return request(app.app.getHttpServer())
          .post('/specifications')
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should create a specification', () => {
      const app = startApp();
      const arrange = CreateSpecificationFixture.arrangeForSave();
      let specRepo: SpecificationRepository.Repository;
      beforeEach(async () => {
        specRepo = app.app.get<SpecificationRepository.Repository>(
          SPECIFICATION_PROVIDERS.REPOSITORIES
            .SPECIFICATION_SEQUELIZE_REPOSITORY.provide,
        );
      });
      test.each(arrange)(
        'when body is $send_data',
        async ({ send_data, expected }) => {
          const res = await request(app.app.getHttpServer())
            .post('/specifications')
            .send(send_data)
            .expect(201);
          const keyInResponse = CreateSpecificationFixture.keysInResponse();
          expect(Object.keys(res.body)).toStrictEqual(['data']);
          expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);
          const id = res.body.data.id;
          const SpecificationCreated = await specRepo.findById(id);
          const presenter = SpecificationsController.userToResponse(
            SpecificationCreated.toJSON(),
          );
          const serialized = instanceToPlain(presenter);
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
