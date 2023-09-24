import * as request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import UserRepository from '../../src/user/domain/repository/user.repository';
import { USER_PROVIDERS } from '../../src/user/infra/nest/user.providers';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';
import { User } from '../../src/user/domain/entities';
import { UserFixture } from '../../src/user/infra/nest/fixtures';
import { UsersController } from '../../src/user/infra/nest/user.controller';

describe('UsersController (e2e)', () => {
  const nestApp = startApp();
  describe('/users/:id (GET)', () => {
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
          .get(`/users/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it('should return a user ', async () => {
      const userRepo = nestApp.app.get<UserRepository.Repository>(
        USER_PROVIDERS.REPOSITORIES.USER_REPOSITORY.provide,
      );
      const user = User.fake().aUser().build();
      userRepo.insert(user);

      const res = await request(nestApp.app.getHttpServer())
        .get(`/users/${user.id}`)
        .expect(200);
      const keyInResponse = UserFixture.keysInResponse();
      expect(Object.keys(res.body)).toStrictEqual(['data']);
      expect(Object.keys(res.body.data)).toStrictEqual(keyInResponse);

      const presenter = UsersController.userToResponse(user.toJSON());
      const serialized = instanceToPlain(presenter);
      expect(res.body.data).toStrictEqual(serialized);
    });
  });
});
