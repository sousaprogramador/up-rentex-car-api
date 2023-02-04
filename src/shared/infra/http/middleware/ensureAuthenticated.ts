import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub:string;
}

export async function ensureAuthenticated(request:Request, response:Response, next:NextFunction) {

  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new Error("Token missing");
  }

  const [,token] = authHeader.split(" ");

  try {
    const { sub : user_id } = verify(token,"9fc58423aa0341dd75c031e1b2fabe0a") as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if(!user){
      throw new Error("User does not exists!");
    }

    request.user = {
      id : user_id
    }

    next();
  } catch (error) {
    throw new Error("Invalid token");
  }
}
