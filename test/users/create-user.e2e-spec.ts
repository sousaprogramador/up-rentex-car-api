import request from 'supertest';
import UserRepository from '../../src/user/domain/repository/user.repository';
import { USER_PROVIDERS } from '../../src/user/infra/nest/user.providers';
import { CreateUserFixture } from '../../src/user/infra/nest/fixtures';
import { UsersController } from '../../src/user/infra/nest/user.controller';
import { instanceToPlain } from 'class-transformer';
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
  });
});
