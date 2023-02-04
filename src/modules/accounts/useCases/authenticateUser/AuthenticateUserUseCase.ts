import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

interface IResquet {
  email:string;
  password:string;
}

interface IResponse {
  user:{
    name:string;
    email:String;
  }
  token:string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  async execute({ email,password }:IResquet):Promise<IResponse>{
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('Email or Password incorrect!');
    }

    const passwordMatch = await compare(password,user.password);

    if(!passwordMatch){
      throw new AppError('Email or Password incorrect!');
    }

    const token = sign({},"9fc58423aa0341dd75c031e1b2fabe0a",{
      subject:user.id,
      expiresIn:'1d'
    })

    const tokenReturn : IResponse ={
      token,
      user:{
        name: user.first_name,
        email: user.email
      }
    }

    return tokenReturn;

  }
}

export { AuthenticateUserUseCase }
