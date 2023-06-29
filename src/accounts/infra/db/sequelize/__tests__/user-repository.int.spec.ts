import { UserSequelizeRepository } from '../user.repository';
import { UserModel } from '../user.model';
import { setupSequelize } from '../../../../../@seedwork/infra';
import { User, UserId } from '../../../../domain/entities';
import { NotFoundError } from '../../../../../@seedwork/domain';
describe('UserSequelizeRepository Unit Tests', () => {
  setupSequelize({ models: [UserModel] });

  let repository: UserSequelizeRepository;

  beforeEach(async () => {
    repository = new UserSequelizeRepository(UserModel);
  });

  it('should inserts a new entity', async () => {
    let user = new User({
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
    });
    await repository.insert(user);
    let entity = await repository.findById(user.id);
    expect(entity.toJSON()).toStrictEqual(user.toJSON());

    user = new User({
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      is_active: false,
    });
    await repository.insert(user);
    entity = await repository.findById(user.id);
    expect(entity.toJSON()).toStrictEqual(user.toJSON());
  });

  it('should throws error when entity not found', async () => {
    await expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id'),
    );

    await expect(
      repository.findById(new UserId('9366b7dc-2d71-4799-b91c-c64adb205104')),
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`,
      ),
    );
  });

  it('should finds a entity by id', async () => {
    const entity = new User({
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      is_active: false,
    });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.entityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('should return all users', async () => {
    const entity = new User({
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      is_active: false,
    });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  it('should throw error on update when a entity not found', async () => {
    const entity = new User({
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      is_active: false,
    });
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`),
    );
  });

  it('should update a entity', async () => {
    const entity = new User({
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      is_active: false,
    });
    await repository.insert(entity);

    entity.update({
      name: 'updated',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      is_active: false,
    });
    await repository.update(entity);

    const entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('should throw error on delete when a entity not found', async () => {
    await expect(repository.delete('fake id')).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id'),
    );

    await expect(
      repository.delete(new UserId('9366b7dc-2d71-4799-b91c-c64adb205104')),
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID 9366b7dc-2d71-4799-b91c-c64adb205104`,
      ),
    );
  });
  it('should delete a entity', async () => {
    const entity = new User({
      name: 'Some testing',
      email: 'mail@testing.com',
      password: '123456',
      driver_licenses: 'AB',
      is_active: false,
    });
    await repository.insert(entity);

    await repository.delete(entity.id);

    await expect(repository.findById(entity.id)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${entity.id}`),
    );
  });
});
