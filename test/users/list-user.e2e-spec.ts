import * as request from 'supertest';
import UserRepository from '../../src/user/domain/repository/user.repository';
import { USER_PROVIDERS } from '../../src/user/infra/nest/user.providers';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';
import { ListUsersFixture } from '../../src/user/infra/nest/fixtures';
import { instanceToPlain } from 'class-transformer';
import { UsersController } from '../../src/user/infra/nest/user.controller';

describe('UsersController (e2e)', () => {
  describe('/users (GET)', () => {
    describe('should return categories sorted by created_at when request query is empty', () => {
      //let userRepo: UserRepository.Repository;
      const nestApp = startApp();
      const { entitiesMap, arrange } =
        ListUsersFixture.arrangeIncrementedWithCreatedAt();

      beforeEach(async () => {
        const userRepo = nestApp.app.get<UserRepository.Repository>(
          USER_PROVIDERS.REPOSITORIES.USER_REPOSITORY.provide,
        );
        await userRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when query params is $send_data',
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();
          return request(nestApp.app.getHttpServer())
            .get(`/users/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                instanceToPlain(UsersController.userToResponse(e)),
              ),
              meta: expected.meta,
            });
        },
      );
    });

    describe('should return categories using paginate, filter and sort', () => {
      //let userRepo: UserRepository.Repository;
      const nestApp = startApp();
      const { entitiesMap, arrange } = ListUsersFixture.arrangeUnsorted();

      beforeEach(async () => {
        const userRepo = nestApp.app.get<UserRepository.Repository>(
          USER_PROVIDERS.REPOSITORIES.USER_REPOSITORY.provide,
        );
        await userRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each([arrange[0]])(
        'when query params is $send_data',
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();
          return request(nestApp.app.getHttpServer())
            .get(`/users/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                instanceToPlain(UsersController.userToResponse(e)),
              ),
              meta: expected.meta,
            });
        },
      );
    });
  });
});
