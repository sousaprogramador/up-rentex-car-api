import * as request from 'supertest';
import UserRepository from '../../src/user/domain/repository/user.repository';
import { USER_PROVIDERS } from '../../src/user/infra/nest/user.providers';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';
import { NotFoundError } from '../../src/@seedwork/domain';
import { User } from '../../src/user/domain/entities';

describe('UsersController (e2e)', () => {
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
          .delete(`/users/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it('should delete a user response with status 204', async () => {
      const userRepo = nestApp.app.get<UserRepository.Repository>(
        USER_PROVIDERS.REPOSITORIES.USER_REPOSITORY.provide,
      );
      const user = User.fake().aUser().build();
      await userRepo.insert(user);

      await request(nestApp.app.getHttpServer())
        .delete(`/users/${user.id}`)
        .expect(204);

      await expect(userRepo.findById(user.id)).rejects.toThrow(
        new NotFoundError(`Entity Not Found using ID ${user.id}`),
      );
    });
  });
});
