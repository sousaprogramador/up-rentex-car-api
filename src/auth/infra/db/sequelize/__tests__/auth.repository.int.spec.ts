import { AuthSequelizeRepository } from '../auth.repository';
import { UserModel } from '../../../../../user/infra/db';
import { User } from '../../../../../user/domain';
import { setupSequelize } from '../../../../../@seedwork/infra';
import { NotFoundError } from '../../../../../@seedwork/domain';

describe('AuthSequelizeRepository Unit Tests', () => {
  setupSequelize({ models: [UserModel] });

  let repository: AuthSequelizeRepository;

  beforeEach(async () => {
    repository = new AuthSequelizeRepository(UserModel);
  });

  it('should finds a entity by email', async () => {
    const entity = new User({
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      is_active: false,
      avatar: '',
    });
    await UserModel.create(entity.toJSON());

    let entityFound = await repository.findByEmail(entity.email);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findByEmail(entity.email);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('should not finds a entity by email', async () => {
    await expect(repository.findByEmail('fake email')).rejects.toThrow(
      new NotFoundError('Entity not found using email fake email'),
    );
  });
});
