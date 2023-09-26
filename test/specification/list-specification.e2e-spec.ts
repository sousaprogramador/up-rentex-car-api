import * as request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { SpecificationRepository } from '../../src/speficiation/domain/repository';
import { SPECIFICATION_PROVIDERS } from '../../src/speficiation/infra/nest/specification.providers';
import { ListSpecificationsFixture } from '../../src/speficiation/infra/nest/fixtures';
import { SpecificationsController } from '../../src/speficiation/infra/nest/specification.controller';
import { startApp } from '../../src/@seedwork/infra/nest/testing/helpers';

describe('SpecificationsController (e2e)', () => {
  describe('/specifications (GET)', () => {
    describe('should return specifications sorted by created_at when request query is empty', () => {
      //let categoryRepo: categoryRepository.Repository;
      const nestApp = startApp();
      const { entitiesMap, arrange } =
        ListSpecificationsFixture.arrangeIncrementedWithCreatedAt();

      beforeEach(async () => {
        const specRepo = nestApp.app.get<SpecificationRepository.Repository>(
          SPECIFICATION_PROVIDERS.REPOSITORIES
            .SPECIFICATION_SEQUELIZE_REPOSITORY.provide,
        );
        await specRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each(arrange)(
        'when query params is $send_data',
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();
          return request(nestApp.app.getHttpServer())
            .get(`/specifications/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                instanceToPlain(SpecificationsController.userToResponse(e)),
              ),
              meta: expected.meta,
            });
        },
      );
    });

    describe('should return specifications using paginate, filter and sort', () => {
      //let categoryRepo: categoryRepository.Repository;
      const nestApp = startApp();
      const { entitiesMap, arrange } =
        ListSpecificationsFixture.arrangeUnsorted();

      beforeEach(async () => {
        const categoryRepo =
          nestApp.app.get<SpecificationRepository.Repository>(
            SPECIFICATION_PROVIDERS.REPOSITORIES
              .SPECIFICATION_SEQUELIZE_REPOSITORY.provide,
          );
        await categoryRepo.bulkInsert(Object.values(entitiesMap));
      });

      test.each([arrange[0]])(
        'when query params is $send_data',
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();
          return request(nestApp.app.getHttpServer())
            .get(`/specifications/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                instanceToPlain(SpecificationsController.userToResponse(e)),
              ),
              meta: expected.meta,
            });
        },
      );
    });
  });
});
