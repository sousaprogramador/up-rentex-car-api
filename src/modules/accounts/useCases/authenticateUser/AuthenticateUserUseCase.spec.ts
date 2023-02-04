import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/AppError";


let authenticateUserUseCase : AuthenticateUserUseCase;
let usersRepositoryInMemory : UsersRepositoryInMemory;
let createUserUseCase : CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(()=>{
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it('shoul be able to authenticate an user',async ()=>{
    const user: ICreateUserDTO ={
      first_name : 'user',
      last_name : 'test',
      driver_license: '12345',
      email: 'user@test.com',
      password: '123'
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({email: user.email, password: user.password});

    expect(result).toHaveProperty('token');
  });

  it('shoul not be able to authenticate an not exists user',async ()=>{
    expect( async ()=>{
      await authenticateUserUseCase.execute({email: 'user@fail.com', password: '123'});
    }).rejects.toBeInstanceOf(AppError);
  });

  it('shoul not be able to authenticate with password incorrect',async ()=>{
    const user: ICreateUserDTO ={
      first_name : 'user',
      last_name : 'test errors',
      driver_license: '12345',
      email: 'user@test.com',
      password: '123'
    }

    await createUserUseCase.execute(user);

    expect( async ()=>{
      await authenticateUserUseCase.execute({email: user.email, password: 'incorrect'});
    }).rejects.toBeInstanceOf(AppError);
  });

 })
