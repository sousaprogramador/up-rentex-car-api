import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";


@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  async execute({
    first_name,
    last_name,
    password,
    email,
    driver_license
  }:ICreateUserDTO):Promise<void> {
    const userAlreadyExists = this.usersRepository.findByEmail(email);

    if(userAlreadyExists){
      throw new AppError("user Already exists")
    }
    const passwordHash = await hash(password,8);

    await this.usersRepository.create({
      first_name,
      last_name,
      password : passwordHash,
      email,
      driver_license
    })
  }
}

export { CreateUserUseCase }
