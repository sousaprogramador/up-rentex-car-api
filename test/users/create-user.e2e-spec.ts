import * as request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import UserRepository from '../../src/user/domain/repository/user.repository';
import { USER_PROVIDERS } from '../../src/user/infra/nest/user.providers';
import { CreateUserFixture } from '../../src/user/infra/nest/fixtures';
import { UsersController } from '../../src/user/infra/nest/user.controller';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';

describe('UsersController (e2e)', () => {
  describe('/users (POST)', () => {
    describe('should a response error with 422 when request body is invalid', () => {
      const app = startApp();
      const invalidRequest = CreateUserFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));
      test.each(arrange)('when body is $label', ({ value }) => {
        return request(app.app.getHttpServer())
          .post('/users')
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
        CreateUserFixture.arrangeForEntityValidationError();
      const arrange = Object.keys(validationError).map((key) => ({
        label: key,
        value: validationError[key],
      }));
      test.each(arrange)('when body is $label', ({ value }) => {
        return request(app.app.getHttpServer())
          .post('/users')
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should create a user', () => {
      const app = startApp();
      const arrange = CreateUserFixture.arrangeForSave();
      let userRepo: UserRepository.Repository;
      beforeEach(async () => {
        userRepo = app.app.get<UserRepository.Repository>(
          USER_PROVIDERS.REPOSITORIES.USER_REPOSITORY.provide,
        );
      });
      test.each(arrange)(
        'when body is $send_data',
        async ({ send_data, expected }) => {
          const res = await request(app.app.getHttpServer())
            .post('/users')
            .send(send_data)
            .expect(201);
          const keyInResponse = CreateUserFixture.keysInResponse();
          expect(Object.keys(res.body)).toStrictEqual(['data']);
          expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);
          const id = res.body.data.id;
          const userCreated = await userRepo.findById(id);
          const presenter = UsersController.userToResponse(
            userCreated.toJSON(),
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
