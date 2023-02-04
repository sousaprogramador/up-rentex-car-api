import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { IUsersRepository } from "../../../repositories/IUserRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository{
  private repository : Repository<User>;

  constructor(){
    this.repository = getRepository(User);
  }

  async create({
    first_name,
    last_name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      first_name,
      last_name,
      password,
      email,
      driver_license
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id:string):Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

}

export { UsersRepository }
