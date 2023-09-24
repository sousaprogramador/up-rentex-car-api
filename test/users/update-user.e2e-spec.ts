import * as request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import UserRepository from '../../src/user/domain/repository/user.repository';
import { USER_PROVIDERS } from '../../src/user/infra/nest/user.providers';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';
import { UpdateUserFixture } from '../../src/user/infra/nest/fixtures';
import { UsersController } from '../../src/user/infra/nest/user.controller';
import { User } from '../../src/user/domain/entities';

describe('UsersController (e2e)', () => {
  const uuid = '9366b7dc-2d71-4799-b91c-c64adb205104';

  describe('/users/:id (PUT)', () => {
    describe('should a response error when id is invalid or not found', () => {
      const nestApp = startApp();
      const faker = User.fake().aUser();
      const arrange = [
        {
          id: '88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
          send_data: {
            name: faker.name,
            email: faker.email,
            password: faker.password,
            avatar: faker.avatar,
            driver_licenses: faker.driver_licenses,
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
            email: faker.email,
            password: faker.password,
            avatar: faker.avatar,
            driver_licenses: faker.driver_licenses,
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
            .put(`/users/${id}`)
            .send(send_data)
            .expect(expected.statusCode)
            .expect(expected);
        },
      );
    });

    describe('should a response error with 422 when request body is invalid', () => {
      const app = startApp();
      const invalidRequest = UpdateUserFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));
      test.each(arrange)('when body is $label', ({ value }) => {
        return request(app.app.getHttpServer())
          .put(`/users/${uuid}`)
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
        UpdateUserFixture.arrangeForEntityValidationError();
      const arrange = Object.keys(validationError).map((key) => ({
        label: key,
        value: validationError[key],
      }));
      let userRepo: UserRepository.Repository;

      beforeEach(() => {
        userRepo = app.app.get<UserRepository.Repository>(
          USER_PROVIDERS.REPOSITORIES.USER_REPOSITORY.provide,
        );
      });
      test.each(arrange)('when body is $label', async ({ value }) => {
        const category = User.fake().aUser().build();
        await userRepo.insert(category);
        return request(app.app.getHttpServer())
          .put(`/users/${category.id}`)
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe('should update a user', () => {
      const app = startApp();
      const arrange = UpdateUserFixture.arrangeForSave();
      let userRepo: UserRepository.Repository;

      beforeEach(async () => {
        userRepo = app.app.get<UserRepository.Repository>(
          USER_PROVIDERS.REPOSITORIES.USER_REPOSITORY.provide,
        );
      });
      test.each(arrange)(
        'when body is $send_data',
        async ({ send_data, expected }) => {
          const userCreated = User.fake().aUser().build();
          await userRepo.insert(userCreated);

          const res = await request(app.app.getHttpServer())
            .put(`/users/${userCreated.id}`)
            .send(send_data)
            .expect(200);
          const keyInResponse = UpdateUserFixture.keysInResponse();
          expect(Object.keys(res.body)).toStrictEqual(['data']);
          expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);
          const id = res.body.data.id;
          const userUpdated = await userRepo.findById(id);
          const presenter = UsersController.userToResponse(
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
