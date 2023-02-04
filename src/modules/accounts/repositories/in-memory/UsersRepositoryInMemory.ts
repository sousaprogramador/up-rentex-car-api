import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/entities/User';
import { IUsersRepository } from '../IUserRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create({
    first_name,
    last_name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { first_name,last_name, email, password, driver_license });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);

    return user;
  }
}

export { UsersRepositoryInMemory };
