import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user = {
      name: 'User test',
      password: 'acb123',
      email: 'testuser@uprental.com.br',
      driver_license: '1234567',
    };

    await createUserUseCase.execute({
      name: user.name,
      password: user.password,
      email: user.email,
      driver_license: user.driver_license,
    });

    const categoryCreated = await usersRepositoryInMemory.findByEmail(
      user.email,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new user with email exists', async () => {
    expect(async () => {
      const user = {
        name: 'User test',
        password: 'acb123',
        email: 'testuser@uprental.com.br',
        driver_license: '1234567',
      };

      await createUserUseCase.execute({
        name: user.name,
        password: user.password,
        email: user.email,
        driver_license: user.driver_license,
      });

      await createUserUseCase.execute({
        name: user.name,
        password: user.password,
        email: user.email,
        driver_license: user.driver_license,
      });
    }).rejects.toEqual(new AppError('User already exists'));
  });
});
